FROM --platform=arm64 node:18-alpine
ARG DB_HOST=${DB_HOST}
ENV DB_HOST=${DB_HOST}
ARG DB_NAME=${DB_NAME}
ENV DB_NAME=${DB_NAME}
ARG DB_USER=${DB_USER}
ENV DB_USER=${DB_USER}
ARG DB_PASSWORD=${DB_PASSWORD}
ENV DB_PASSWORD=${DB_PASSWORD}
WORKDIR /app
COPY package.json ./
RUN npm install --location=global pnpm
RUN pnpm install
COPY . .
RUN pnpm prune --prod

EXPOSE 4000
CMD ["node", "server.js"]