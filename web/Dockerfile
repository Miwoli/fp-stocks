# Installs the current application on a Node Image.
FROM node:11.15

# Prepare system for Node app
RUN apt-get update && apt-get install -y build-essential libpq-dev vim

# Creates the directory and all the parents (if they don’t exist)
RUN mkdir -p /var/www/app/

# Install all the packages
RUN npm install -g @angular/cli
RUN npm install