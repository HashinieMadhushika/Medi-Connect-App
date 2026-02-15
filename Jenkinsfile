pipeline {
    agent any

    environment {
        // Jenkins credentials → type: "Username with password", ID: dockerhub-login
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME    = 'hashinie'  // Updated to your Docker Hub username
        EC2_HOST              = '3.80.227.4' // Replace with your EC2 public IP or hostname
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/HashinieMadhushika/Medi-Connect-App.git'
            }
        }

        stage('Build Docker Images from Compose') {
           steps {
                script {
                    echo "Building backend image (medi-backend)..."
                    sh 'docker build -t medi-backend:latest -f backend/Dockerfile ./backend'  // Fixed path

                    echo "Building frontend image (medi-frontend)..."
                    sh 'docker build -t medi-frontend:latest -f frontend/Dockerfile ./frontend'  // Fixed path
                }
            }
        }

        stage('Tag Images for Docker Hub') {
            steps {
                script {
                    def frontendImageLocal  = 'medi-frontend:latest'
                    def backendImageLocal   = 'medi-backend:latest'
                    def frontendImageRemote = "${DOCKERHUB_USERNAME}/medi-frontend:latest"
                    def backendImageRemote  = "${DOCKERHUB_USERNAME}/medi-backend:latest"

                    sh """
                        echo "Tagging images for Docker Hub..."
                        docker tag ${frontendImageLocal} ${frontendImageRemote}
                        docker tag ${backendImageLocal}  ${backendImageRemote}
                    """
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                sh '''
                    echo "$DOCKERHUB_CREDENTIALS_PSW" | docker login -u "$DOCKERHUB_CREDENTIALS_USR" --password-stdin
                '''
            }
        }

        stage('Push Images to Docker Hub') {
            steps {
                script {
                    def frontendImageRemote = "${DOCKERHUB_USERNAME}/medi-frontend:latest"
                    def backendImageRemote  = "${DOCKERHUB_USERNAME}/medi-backend:latest"

                    sh """
                        echo "Pushing images to Docker Hub..."
                        docker push ${frontendImageRemote}
                        docker push ${backendImageRemote}
                    """
                }
            }
        }

        stage('Clean Up') {
            steps {
                sh 'docker system prune -af || true'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                        scp -o StrictHostKeyChecking=no deploy_on_ec2.sh ubuntu@${EC2_HOST}:/home/ubuntu/

                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                            export DOCKERHUB_USERNAME=${DOCKERHUB_USERNAME}
                            export DOCKERHUB_TOKEN=${DOCKERHUB_CREDENTIALS_PSW}
                            chmod +x /home/ubuntu/deploy_on_ec2.sh
                            /home/ubuntu/deploy_on_ec2.sh
                        '
                    """
                }
            }
        }

        stage('Seed Database') {
            steps {
                sshagent(credentials: ['ec2-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@${EC2_HOST} '
                            docker exec medi-backend npm run seed || echo "Already seeded or failed."
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo '✅ Images built and pushed to Docker Hub successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the stage logs for details.'
        }
    }
}