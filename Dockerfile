# syntax=docker/dockerfile:1

##############################################
# Base: Node + pnpm
##############################################
FROM node:22-bookworm-slim AS base
ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:$PATH" \
    HUSKY=0
RUN npm install --global pnpm@10 && pnpm --version
WORKDIR /app

##############################################
# Dependencies
##############################################
FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

##############################################
# Development: Vite dev server, source bind-mounted by compose
##############################################
FROM base AS development
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev", "--host", "0.0.0.0", "--port", "5173"]

##############################################
# Build: static bundle
##############################################
FROM base AS build
ARG VITE_API_URL=http://localhost:1337
ENV VITE_API_URL=$VITE_API_URL
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

##############################################
# Production: nginx serving the SPA
##############################################
FROM nginx:1.27-alpine AS production
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
