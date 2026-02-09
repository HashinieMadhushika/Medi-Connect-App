#!/bin/sh
# wait-for-mongodb.sh

set -e

host="$1"
shift

until nc -z "$host" 27017; do
  echo "Waiting for MongoDB at $host:27017..."
  sleep 2
done

echo "MongoDB is up - executing command"
exec "$@"
