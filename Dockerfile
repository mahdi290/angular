# Stage 1: Build Angular application
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Build the Angular project using the build-prod script
RUN npm run build-prod

# Stage 2: Serve Angular application with Nginx
FROM nginx:alpine

# Copy compiled Angular files from the first stage
# Make sure to copy from the right directory under /app/dist/
COPY --from=builder /app/dist/employee /usr/share/nginx/html

# Copy custom Nginx configuration (if you have one)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the Docker daemon so that it can accept incoming requests
EXPOSE 80

# Use the "exec" form of CMD to ensure that Nginx stays in the foreground
CMD ["nginx", "-g", "daemon off;"]