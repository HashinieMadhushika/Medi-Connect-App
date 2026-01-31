FROM node:18-alpine
WORKDIR '/app'

COPY package.json .
RUN npm install
COPY . .

COPY wait-for-mysql.sh /wait-for-mysql.sh
RUN chmod +x /wait-for-mysql.sh

EXPOSE 5000
CMD ["/wait-for-mysql.sh", "mysql_c", "node", "server.js"]
