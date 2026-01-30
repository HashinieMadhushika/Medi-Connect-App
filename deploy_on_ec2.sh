#!/bin/bash
# deploy_on_ec2.sh
# Pull latest Docker images and restart containers on EC2

# Exit immediately if a command fails
set -e

# Check required environment variables
if [ -z "$DOCKERHUB_USERNAME" ] || [ -z "$DOCKERHUB_TOKEN" ]; then
    echo "ERROR: DOCKERHUB_USERNAME or DOCKERHUB_TOKEN not set!"
    exit 1
fi

# Log in to Docker Hub
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

# Pull latest images
docker pull $DOCKERHUB_USERNAME/medi-backend:latest
docker pull $DOCKERHUB_USERNAME/medi-frontend:latest

# Stop and remove existing containers gracefully if running
docker stop medi-backend medi-frontend || true
docker rm medi-backend medi-frontend || true

# Run backend container
docker run -d --name medi-backend -p 3000:3000 $DOCKERHUB_USERNAME/medi-backend:latest

# Run frontend container
docker run -d --name medi-frontend -p 80:80 $DOCKERHUB_USERNAME/medi-frontend:latest

echo "Deployment complete!"
