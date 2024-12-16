FROM node:23.4-alpine as builder

WORKDIR /app


# Install the dependencies.
COPY ./package.json .
COPY ./package-lock.json .
RUN npm i

# Copy the assets.
COPY ./public ./public
COPY ./src ./src
COPY ./index.html .
COPY ./vite.config.ts .
COPY ./tsconfig.json .
COPY ./tsconfig.app.json .
COPY ./tsconfig.node.json .
COPY .env .

# Load the env variables.
ARG VITE_SERVICE_URL
ENV VITE_SERVICE_URL=$VITE_SERVICE_URL

# Build the bundle.
RUN npm run build

# Install http-server
RUN npm install -g http-server

# Serve the bundle.
CMD [ "http-server", "dist", "-p", "6969" ]
