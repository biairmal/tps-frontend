# Name the node stage "builder"
FROM node:18-alpine AS builder-stage

# Set working directory
WORKDIR /app

# Copy our node module specification
COPY package.json package.json
COPY yarn.lock yarn.lock

# install node modules and build assets
RUN yarn install --production

# Copy all files from current directory to working dir in image
# Except the one defined in '.dockerignore'
COPY . .

# Create production build of React App
RUN yarn build

# Choose NGINX as our base Docker image
FROM nginx:stable-alpine

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf *

# Add config file
# RUN rm /etc/nginx/nginx.conf /etc/nginx/conf.d/default.conf
# COPY nginx.conf /etc/nginx

# Copy static assets from builder stage
COPY --from=builder-stage /app/build /usr/share/nginx/html

# Entry point when Docker container has started
ENTRYPOINT ["nginx", "-g", "daemon off;"]