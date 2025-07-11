# Use NVIDIA CUDA base image with Ubuntu for full GPU support
FROM nvidia/cuda:12.2-runtime-ubuntu22.04

# Install Node.js 18
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN npm install --only=production

# Copy the application code to the container
COPY . .

# Create a non-root user to run the application
RUN groupadd -g 1001 nodejs \
    && useradd -r -u 1001 -g nodejs nodejs

# Change the ownership of the /app directory to the nodejs user
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose the port that the application listens on
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:3000/health || exit 1

# Define the command to run the application
CMD ["npm", "start"]