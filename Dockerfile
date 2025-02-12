# Build stage
FROM node:20-alpine AS builder

# Accept build arguments
ARG AZURE_OPENAI_API_KEY
ARG AZURE_OPENAI_ENDPOINT
ARG AZURE_OPENAI_DEPLOYMENT_NAME
ARG AZURE_OPENAI_API_VERSION
ARG NODE_ENV=production
ARG NEXT_TELEMETRY_DISABLED=1

# Set environment variables for build stage
ENV AZURE_OPENAI_API_KEY=${AZURE_OPENAI_API_KEY} \
    AZURE_OPENAI_ENDPOINT=${AZURE_OPENAI_ENDPOINT} \
    AZURE_OPENAI_DEPLOYMENT_NAME=${AZURE_OPENAI_DEPLOYMENT_NAME} \
    AZURE_OPENAI_API_VERSION=${AZURE_OPENAI_API_VERSION} \
    NODE_ENV=${NODE_ENV} \
    NEXT_TELEMETRY_DISABLED=${NEXT_TELEMETRY_DISABLED}

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
COPY server/package*.json ./server/
RUN npm ci && \
    cd server && \
    npm ci && \
    cd ..

# Copy source code and build
COPY . .
RUN npm run build:all

# Production stage
FROM node:20-alpine

# Set production environment variables
ENV AZURE_OPENAI_API_KEY=${AZURE_OPENAI_API_KEY} \
    AZURE_OPENAI_ENDPOINT=${AZURE_OPENAI_ENDPOINT} \
    AZURE_OPENAI_DEPLOYMENT_NAME=${AZURE_OPENAI_DEPLOYMENT_NAME} \
    AZURE_OPENAI_API_VERSION=${AZURE_OPENAI_API_VERSION} \
    NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /app/build ./build
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server/package*.json ./server/

# Install production dependencies and clean up
RUN npm ci --only=production && \
    cd server && \
    npm ci --only=production && \
    cd .. && \
    npm cache clean --force && \
    rm -rf /root/.npm

# Security and runtime configuration
USER node
EXPOSE 3000

# Health check configuration
HEALTHCHECK --interval=30s \
            --timeout=30s \
            --start-period=5s \
            --retries=3 \
    CMD node -e "try { require('http').get('http://localhost:3000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1)); } catch (e) { process.exit(1); }"

# Start command with garbage collection enabled
CMD ["node", "--expose-gc", "./build/server/index.js"]