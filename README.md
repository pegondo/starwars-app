# Starwars app

Starwars app is a simple React + TS + Vite app that allows you to enjoy exploring the Star Wars universe by interacting with the service in [this repository](https://github.com/pegondo/starwars-service).

## Features

Starwars app provides two tables to view the people and the planets collections offered by [the starwars-service](https://github.com/pegondo/starwars-service). These tables have facilities to:

- Navigate the information in a paginated format.

- Search for elements based on their name.

- Sort the elements based on their name or creation date in ascending or descending order.

With all these facilities managed in the service, not in the client.

## Run the application

For the application to run correctly, you must first start the Starwars service. [Here](https://github.com/pegondo/starwars-service?tab=readme-ov-file#run-the-service)'s a guide on how to do so.

Then, you have to clone this repository:

```bash
git clone https://github.com/pegondo/starwars-app.git
cd starwars-app
```

Once you have done this, there are three ways or running this application.

### Run the application in dev mode

To run the application in debug mode, you have to:

1. Install the dependencies:

```bash

npm i

```

2. Run the app in dev mode:

```bash

npm run dev

```

### Build and serve the application

1. Install the dependencies:

```bash

npm i

```

2. Build the application

```bash

npm run build

```

3. Serve the application with the [serve](https://www.npmjs.com/package/serve) or [http-serve](https://www.npmjs.com/package/http-serve) commands. E.g:

```bash

serve dist

```

### Run the application in a docker container

To run the application in a docker container:

1. Change the `VITE_SERVICE_URL` environment variable to `http://<your-ip>:8080/api` in the `.env` file. This is needed because the service and the app are running in different containers. Another option is to leave the variable as it is and move both containers to run in the same docker network.
2. Build the docker image:

```bash

docker compose -f docker/docker-compose.yaml --env-file .env build

```

2. Start the container:

```bash

docker compose -f docker/docker-compose.yaml --env-file .env up

```

No matter the method you used, the service will be running in port `6969`.

## Testing

Starwars app has unit and e2e testing.

### Run the unit tests

To run the unit tests, use:

```bash

npm run test

```

### Run the e2e tests

To run the e2e tests:

1. Run the Starwars service. You can find a guide [here](https://github.com/pegondo/starwars-service?tab=readme-ov-file#run-the-service).

2. Run:

```bash

npm e2e:chrome

```
