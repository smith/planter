FROM node:18
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm ci --omit=dev
RUN npm run build:ts
# Bundle app source
COPY . .
CMD [ "node", "index.js" ]
