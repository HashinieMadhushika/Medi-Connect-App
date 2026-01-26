pipeline {
    agent any

    environment {
        // Jenkins credentials → type: "Username with password", ID: dockerhub-login
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
        DOCKERHUB_USERNAME    = 'hashinie'  // Updated to your Docker Hub username
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
    }

    post {
        success {
            echo '✅ Images built and pushed to Docker Hub successfully!'
        }
        failure {
            echo '❌ Pipeline failed. Check the stage logs for details.'
        }
    }
}