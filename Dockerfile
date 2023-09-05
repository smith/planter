FROM node:18
# Create app directory
WORKDIR /usr/src/app
COPY . .
RUN npm ci && npm run build:ts
CMD [ "node", "index.js" ]
