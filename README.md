# tdb-backend
The API for The Devils Backbone raid system

## Installation

1. Install NodeJS
2. Install MariaDB
3. Install yarn and nodemon globally through npm, run this in your project folder: `npm i -g yarn nodemon`
4. Install the project's packages with the command `yarn`
5. Copy `example.env` into a file called `.env`, then edit the file with all the correct variables needed to run the container
6. Initialize the database by running `npx sequelize-cli db:migrate:all` and `npx sequelize-cli db:seed:all`
7. For development, there's no need to compile the container. Just run `nodemon` which will watch your files for updates and auto-compile as they are updated.

## Compiling

Pushing the project to GitHub's master will automatically compile the project.

You can also do this manually:

1. Install Docker
2. Run `docker build .` in your project folder. This will generate a hashed ID string representing the container. Copy this.
3. Run `docker run <ID string>`. This will produce a new container ID string. Copy this.
4. Enter the container by running `docker exec -it <new ID string>`.
5. Initialize the database by running `npx sequelize-cli db:migrate:all` and `npx sequelize-cli db:seed:all`
6. Type `exit` to exit the container.

The container should now be running on your computer, with it's attached database. Parts of this will be used in deploying the containers in a production environment as well.

## Resources

Docker <https://www.docker.com/>
Node <https://nodejs.org/en/>
Sequelize <https://sequelize.org/>
MariaDB <https://mariadb.org/>