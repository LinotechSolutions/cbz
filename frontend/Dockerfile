# ==========================================
# Stage 1: Build Stage
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package management manifests. The lockfile lives at the npm workspace
# root, so it is only present when the build context is the repo root.
COPY package.json package-lock.json* ./

# Install dependencies (dev deps included: the build needs tsx and astro)
RUN if [ -f package-lock.json ]; then npm ci; else npm install --no-audit --no-fund; fi

# Copy project source files
COPY . .

# Public site URL for canonical links and the sitemap
ARG SITE_URL=https://www.cbz.co.zw
ENV SITE_URL=$SITE_URL

# Port content, build the static site, write HANDOFF.md
RUN npm run build

# ==========================================
# Stage 2: Production Runtime Stage
# ==========================================
FROM nginx:alpine AS runner

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built application assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom Nginx server configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:80/health || exit 1

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
