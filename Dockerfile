FROM node:18-alpine
# Create app directory
WORKDIR /app
COPY . .
RUN npm ci && npm run build:ts
CMD [ "node", "index.js" ]
