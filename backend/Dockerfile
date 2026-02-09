FROM node:18-alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

COPY wait-for-mongodb.sh /wait-for-mongodb.sh
RUN chmod +x /wait-for-mongodb.sh

EXPOSE 5000
CMD ["/wait-for-mongodb.sh", "mongodb_c", "node", "server.js"]
