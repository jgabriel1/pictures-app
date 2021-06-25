# my.Pictures

This is a full-stack application using NodeJS on the back-end and React with NextJS on the front-end. Both are using 100% TypeScript source code.

Some *notable* libraries that were used during development:

* Back-End:
    - Express
    - TypeORM
    - multer
    - BCrypt

* Front-End:
    - NextJS
    - Chakra UI
    - React Hook Form
    - React Query

Among many others.


## Running with Docker

The application was setup to be ran from a docker-compose.yml file.

To run it that way, you just need to have `docker` and `docker-compose` installed and run the following command in the root folder of this repository (where the docker-compose.yml file is located):

```
docker-compose up -d
```

**Important Notes**
* The back-end application will run on **PORT 3333** ;
* The front-end application will run on **PORT 3000** ;
* The PostgreSQL database will run on **PORT 5432** ;
* Make sure all these ports are available before running the above command.

## Running without Docker

To run the application without the docker-compose file, you'll need to run each part separately.

### Back-End

To run the back-end application simply enter the `backend` folder and run:

```
yarn
yarn build
yarn start
```

The first command will install all required dependencies. The second command will compile the TypeScript code into a `dist/` folder and the third one will run the compiled JavaScript application.

**Important Notes**
* The application will run on **PORT 3333** so make sure it is available in your machine before you start it;
* Since the Docker configuration also runs a PostgreSQL database, when running outside of it that database will not be available and the application will connect to a *fallback* SQLite database. Other than that it will work the same.


### Front-End

To run the front-end server simply enter the `my-pictures` folder and run:

```
yarn
yarn build
yarn start
```

The first command will install all required dependencies. The second command will compile the application into a production build for NextJS and the third one will run the application.

**Important Notes**
* The application will run on **PORT 3000** so make sure it is available in your machine before you start it;


