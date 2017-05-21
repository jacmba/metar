FROM node:boron-alpine

# Create app dir
RUN mkdir -p /usr/app
WORKDIR /usr/app

# Bundle app source
COPY . /usr/app

# Install dependencies
RUN npm install

# Publish http port
EXPOSE 3000

# Run app
CMD ["npm", "start"]