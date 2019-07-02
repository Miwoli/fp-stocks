# FP Stocks
## Instalation guide
`git clone` project to your desired location. Than `cd` into created with clone directory, and run `docker-compose up --build` if it's the first time You're launching the app, or after You did some changes to docker files. If non above, simple `docker-compose up` is enough. You alse need to run `npm i` in both _/api_ and _/web_ folders.

## Configuration
Main docker DB config is in root folder named `.env`. Feel free to change names and pass to adjust. It's for development purpose only. (There're rummors, that running Docker version DB on production ain't good idea)

Here in _docker-compose.yml_ file You can also adjust ports.

To configure DB connection, you should take a look into _/api/config.json_ file. Make sure to set up db correctly.

In _api_ folder there're also SSL Certificates for development purpose only. If You'll ever like to move the app to production, buy yourself a proper certs, throw them into _/api/certs_ folder and change _/api/src/index.ts_ cert and key name to fit Yours.

Front app config can be found in _/web/src/environments_ folder.

## DB Migration
When the app is running and the connection to DB from _api_ is set up, You should run the migration. `cd` into _/api_ folder and run `npm run migrate`. If there's a MariaDB date format error just run it one more time. (Sorry 'bout that, v2 will be better there).

## Running
After doin' all the steps above, the app should be fully operational. By default the front is running on `https://localhost:4200`, the API is at `https://localhost:3030` and PHPMyAdmin **(FOR DEVELOPMENT PURPOSE ONLY!)** is on `localhost:8181`. (The http**s**) in web and api are important, http2 is great and it needs that.