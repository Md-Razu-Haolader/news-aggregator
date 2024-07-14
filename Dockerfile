FROM node:22-alpine

RUN mkdir /app && chown -R node:node /app

WORKDIR /app
COPY package.json yarn.lock ./
COPY --chown=node:node . .

# Copy environment variables
COPY .env .env

# Set environment variable to disable postinstall script
ENV DISABLE_POSTINSTALL=true

# Install dependencies with verbose logging
RUN yarn install --verbose

# Install necessary dependencies for Prisma
RUN apk add --no-cache openssl

# Generate Prisma client
RUN yarn prisma:generate

# Build the application
RUN yarn build

USER root
RUN apk del .build-deps

USER node
CMD ["yarn", "start"]

