# Installs the current application on a Node Image.
FROM node:10.15

# Prepare system for Node app
RUN apt-get update && apt-get install -y build-essential libpq-dev vim

# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p /var/www/app/

WORKDIR /var/www/app

COPY package.json .

# Install all the packages
RUN cd /var/www/app && npm install

COPY . .