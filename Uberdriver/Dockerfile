# Use Node.js
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy everything from the current folder into the container
COPY . .

# Install dependencies
RUN npm install

# Build React app
RUN npm run build

# Expose port
EXPOSE 3000

# Start server
CMD ["node", "server.js"]
