# Stage 1: Build
FROM node:22.14.0 AS build

WORKDIR /app

# Copy package.json & package-lock.json / pnpm-lock.yaml / yarn.lock
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the Vite app
RUN npm run build

# Stage 2: Serve
FROM node:22.14.0

WORKDIR /app

# Install serve to serve the production build
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=build /app/dist ./dist

EXPOSE 3000

# Start the app using serve
CMD ["serve", "-s", "dist", "-l", "3000"]
