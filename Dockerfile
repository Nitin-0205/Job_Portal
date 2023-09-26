FROM node:alpine
WORKDIR '/app'
COPY package.json .
# Install dependencies
RUN npm install
COPY . .
EXPOSE 3000
# Default command
CMD ["npm", "run", "start"]

