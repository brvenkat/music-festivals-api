# Energy Australia

## Component Outline
This is an express app written in typescript that fetch data from Music Festivals API. In case we get error from the music festivals endpoint
either due to error code 429 (throttling) or any other code, it returns data from cache. Also noticed that the music festivals endpoint API is not returning consistent data.

## Set up
Please create a .env file at top directory level with the following entry
MUSIC_FESTIVALS_URL=http://eacodingtest.digital.energyaustralia.com.au/api/v1/festivals

## Running

### Install packages.

`npm install`

### Run the application:

`npm start`

## Tech Stack

- Typescript
- Jest
- Express
- Express Memory Cache

## CLI Commands

``` bash
# install dependencies
npm install

# start server
npm start

# run tests with jest
npm test
```