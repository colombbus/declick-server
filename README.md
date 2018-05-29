# declick-server

A REST web service used in the [Declick project](http://declick.net/) to centralize and interact with the internal and community's data.

**_This is a work in progress._**

## installation

* Install [Git](https://git-scm.com/download).
* Install [Node.js](https://nodejs.org/en/download/).
* Install [Yarn](https://yarnpkg.com/en/docs/install).
* Install [PostgreSQL](https://www.postgresql.org/download/).
* Open a terminal and move to the directory where you want to install declick-server.
* Run:
```
git clone https://github.com/colombbus/declick-server
yarn install
```

## configuration

* Create a PostgreSQL database.
* Copy and rename `.env.example` to `.env` and change its content to match your configuration.

## start

1. Start PostgreSQL.
2. Run:
```
yarn run start
```

## TODO

* Simplify config.
* Lower dependencies.
* Turn common fonctionnalities into other packages.
* Implement remaining routes.
* Test.
