# Planter

A program that uses the [Harvest API](https://help.getharvest.com/api-v2/) to create time tracking events.

I built this because I, for productivity reasons, use [Harvest](https://harvestapp.com/) to track daily tasks like reading email, learning, and prioritizing issues.

It's intended to be run once daily to set up all the expected tasks for the day.

(these tasks are currently hard-coded in index.ts to the ones I use on my account)

## Running

`npm install` to install dependencies. `npm run build:ts` will build the index.js file which you can run with `node index.js`.

The `HARVEST_ACCESS_TOKEN`, `HARVEST_ACCOUNT_ID`, and `HARVEST_PROJECT_ID` environment variables must be set.

### Running from docker

You can `docker run ghcr.io/smith/planter:latest` to run the latest published container.
