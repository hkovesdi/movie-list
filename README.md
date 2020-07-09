# About the application

Laravel + Vue.js app for creating a movie list where you can keep track which movies you are currently watching / watched and lets you rate them.

## Project setup

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop 'Docker dekstop') is installed on your machine if you are using windows or mac, or docker-compose if you are using linux.

### Configuring Laradock

1. Navigate to the laradock folder and create your `.env` file with `cp env-example .env`

2. Update your env file with the following:

   ```
   WORKSPACE_INSTALL_MONGO=true
   PHP_FPM_INSTALL_MONGO=true
   ```

3. If you are using <b>Windows</b> you need to change the value of `DATA_PATH_HOST` variable to `/Users/yourWindowsUserName/.laradock/data` otherwise the mongo container will not start

4. If you want to use XDEBUG then set the `PHP_FPM_INSTALL_XDEBUG` variable to `true`

### Configuring Laravel

1. Navigate to the project's root directory and create the `.env` file with `cp .env.example .env`

2. Open your Laravel’s `.env` file and update the following variables:

   ```
   DB_CONNECTION=mongodb
   DB_HOST=mongo
   DB_PORT=27017
   DB_DATABASE=database
   DB_USERNAME=
   DB_PASSWORD=
   ```

3. Create your `.npmrc` with `cp .npmrc-example .npmrc` and add your FontAwesome Pro auth token to it.

### Building Laradock

1. Navigate to the `laradock` folder and start your docker containers with `docker-compose up -d --build workspace nginx mongo` _Note: The building process might take a while_

2. Bash into the `workspace` container with `docker-compose exec workspace bash`

3. Install the composer packages with `composer install`

4. Install the npm packages with `npm install`

5. Compile the assets with `npm run dev`

6. Generate your application key with `php artisan key:generate`

7. Run the migrations with `php artisan migrate`

8. Well done! Visit `http://localhost`

#### Full list of build commands

```
docker-compose up -d --build workspace nginx mongo
docker-compose exec workspace bash
composer install
npm install
npm run dev
php artisan key:generate
php artisan migrate
```
