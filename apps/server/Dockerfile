FROM node:alpine AS builder

# Update builder image and install dependencies
RUN apk update

# Set working directory
WORKDIR /app

# Install Turbo CLI for monorepository management
RUN yarn global add turbo

# Add files of monorepository to container
COPY . .

# Install dependencies for application and purne unused dependencies
RUN turbo prune --scope=server --docker

# Install dependencies for application
FROM node:alpine AS installer

# Update builder image and install dependencies
RUN apk update && apk add --update python3 make g++

# Set working directory
WORKDIR /app

# Copy dependencies from builder image
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
COPY --from=builder /app/out/full/ .
COPY .gitignore .gitignore
COPY turbo.json turbo.json

# Install dependencies for application
RUN yarn install
# Build application
RUN yarn turbo run build --filter=server...

# Prepare runner of application
FROM node:alpine AS runner

# Set working directory
WORKDIR /app

# Expose default application port
EXPOSE 1337

# Create user for running application
RUN addgroup --system --gid 1001 runner
RUN adduser --system --uid 1001 runner

# Use non-root user
USER runner

# Copy application from builder image
COPY --from=installer /app .

# Start application
CMD node apps/server/dist/index.js
