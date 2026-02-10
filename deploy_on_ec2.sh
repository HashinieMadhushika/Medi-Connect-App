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
docker stop medi-backend medi-frontend mongodb || true
docker rm medi-backend medi-frontend mongodb || true

# Create a Docker network for container communication (if not exists)
docker network create medi-network || true

# Run MongoDB container
docker run -d \
  --name mongodb \
  --network medi-network \
  --restart always \
  -v mongodb_data:/data/db \
  -e MONGO_INITDB_DATABASE=mediconnect \
  mongo:7.0

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to start..."
sleep 10

# Run backend container
docker run -d \
  --name medi-backend \
  --network medi-network \
  --restart always \
  -p 5000:5000 \
  -e MONGO_URI=mongodb://mongodb:27017/mediconnect \
  -e JWT_SECRET=your-super-secret-jwt-key-change-in-production \
  $DOCKERHUB_USERNAME/medi-backend:latest

# Run frontend container
docker run -d \
  --name medi-frontend \
  --network medi-network \
  --restart always \
  -p 80:80 \
  $DOCKERHUB_USERNAME/medi-frontend:latest

echo "Deployment complete!"
