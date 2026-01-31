#!/bin/bash
# deploy_on_ec2.sh
# Deploy full stack using Docker Compose on EC2

set -e

# Check required environment variables
if [ -z "$DOCKERHUB_USERNAME" ] || [ -z "$DOCKERHUB_TOKEN" ]; then
    echo "ERROR: DOCKERHUB_USERNAME or DOCKERHUB_TOKEN not set!"
    exit 1
fi

echo "🔐 Logging into Docker Hub..."
echo "$DOCKERHUB_TOKEN" | docker login -u "$DOCKERHUB_USERNAME" --password-stdin

echo "📦 Pulling latest images..."
docker pull $DOCKERHUB_USERNAME/medi-backend:latest
docker pull $DOCKERHUB_USERNAME/medi-frontend:latest

echo "🛑 Stopping existing containers..."
docker compose down

echo "🚀 Starting services with Docker Compose..."
docker compose up -d

echo "✅ Deployment complete!"
