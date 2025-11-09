# Build + runtime in a single image (simple for small apps)
FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

# Copy the rest of the source
COPY . .

# Build the Vite app
RUN npm run build

# Simple static server for the built app
RUN npm install -g serve

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

# Serve the built SPA on the PORT Cloud Run gives us
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
