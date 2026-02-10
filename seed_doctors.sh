#!/bin/bash
# seed_doctors.sh
# Script to seed the database with sample doctors

echo "🌱 Seeding database with sample doctors..."
echo "========================================"

# Check if backend container is running
if ! docker ps | grep -q medi-backend; then
    echo "❌ Error: medi-backend container is not running!"
    echo "Please ensure the backend container is running first."
    exit 1
fi

# Run the seed script inside the backend container
echo "Running seed script..."
docker exec medi-backend npm run seed

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database seeding completed successfully!"
    echo "You can now view doctors at: http://3.80.227.4/doctors"
else
    echo ""
    echo "❌ Database seeding failed!"
    echo "Check the logs with: docker logs medi-backend"
    exit 1
fi
