# ============================================================
# EduOps frontend - multi-stage build
# Stage 1: Node build (Angular) -> Stage 2: Nginx static server
# ============================================================

FROM node:22-alpine AS build
WORKDIR /build
COPY package.json package-lock.json ./
# Exact versions are pinned in package.json and enforced by "overrides".
# --legacy-peer-deps is deliberately NOT used: it lets npm hoist a newer
# @angular/build (which requires TypeScript 6) next to Angular 18.
RUN npm ci --no-audit --no-fund
COPY . ./
RUN npm run build -- --configuration production

FROM nginx:1.27-alpine AS runtime
RUN apk add --no-cache wget
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist/eduops/browser /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=15s --timeout=5s --retries=5 \
  CMD wget -qO- http://localhost/healthz || exit 1
CMD ["nginx","-g","daemon off;"]
