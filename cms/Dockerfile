# ==========================================
# CBZ Holdings — Strapi CMS Production Dockerfile
# Optimized for Railway and Containerized Deployments
# ==========================================
FROM node:20-alpine AS builder

# Install system dependencies required for native builds (e.g. sharp image processor)
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev git

WORKDIR /opt/
COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

WORKDIR /opt/app
COPY . .
ENV PATH=/opt/node_modules/.bin:$PATH
ENV NODE_ENV=production

# Compile production admin UI assets
RUN npm run build

# ==========================================
# Production Runtime Stage
# ==========================================
FROM node:20-alpine
RUN apk add --no-cache vips-dev

WORKDIR /opt/
COPY --from=builder /opt/node_modules ./node_modules
WORKDIR /opt/app
COPY --from=builder /opt/app ./
ENV PATH=/opt/node_modules/.bin:$PATH

ENV NODE_ENV=production
RUN mkdir -p /opt/app/public/uploads

EXPOSE 1337

CMD ["npm", "run", "start"]
