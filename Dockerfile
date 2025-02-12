#Build stage
FROM node:20-alpine AS builder

# Set environment variables to optimize Node.js container
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy package* files
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci
RUN cd server && npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build:all

# Production stage
FROM node:20-alpine

# Set environment variables to production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server/package*.json ./server/

# Install production dependencies only
RUN npm ci --only=production && \
    cd server && npm ci --only=production && \
    cd .. && \
    # Cleaning cache and temporary files to reduce image size
    npm cache clean --force && \
    rm -rf /root/.npm

# Set up a non-root user for security reasons
USER node

# Expose port
EXPOSE 3000

# Healthcheck to monitor the container
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD node -e "try { require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1)); } catch (e) { process.exit(1); }"

# Start the server with proper signal handling
CMD ["node", "--expose-gc", "./build/server/index.js"]