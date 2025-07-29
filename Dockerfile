# Stage 1: Build the React application
FROM node:lts-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
ENV VITE_BACKEND_PROD_HOST="gym-backend-api.gymudaan.com"
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Stage 2: Serve the built application with Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5001

CMD ["nginx", "-g", "daemon off;"]
