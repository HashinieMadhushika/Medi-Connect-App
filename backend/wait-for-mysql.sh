#!/bin/sh
# wait-for-mysql.sh

set -e

host="$1"
shift

until nc -z "$host" 3306; do
  echo "Waiting for MySQL at $host:3306..."
  sleep 2
done

echo "MySQL is up - executing command"
exec "$@"
