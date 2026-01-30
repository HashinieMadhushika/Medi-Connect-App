#!/bin/bash
# Script to pull latest images and restart containers on EC2

DOCKERHUB_USERNAME=hashinie

# Pull latest images
docker pull $DOCKERHUB_USERNAME/medi-backend:latest
docker pull $DOCKERHUB_USERNAME/medi-frontend:latest

# Stop and remove existing containers if running
docker rm -f medi-backend || true
docker rm -f medi-frontend || true

# Run backend container
docker run -d --name medi-backend -p 3000:3000 $DOCKERHUB_USERNAME/medi-backend:latest

# Run frontend container
docker run -d --name medi-frontend -p 80:80 $DOCKERHUB_USERNAME/medi-frontend:latest

echo "Deployment complete!"
