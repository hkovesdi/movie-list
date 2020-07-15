# About the application

Laravel + Vue.js app for creating a movie list where you can keep track which movies you are currently watching / watched and lets you rate them.

## Project setup

Make sure [Docker Desktop](https://www.docker.com/products/docker-desktop 'Docker dekstop') is installed on your machine if you are using windows or mac, or docker-compose if you are using linux.

### Configuring Laradock

1. Navigate to the laradock folder and create your `.env` file with `cp env-example .env`

2. Update your env file with the following:

   ```
    MYSQL_DATABASE= the desired name of your database
    MYSQL_USER= the user you want to connect with (can be root)
    MYSQL_PASSWORD= password for the user
    MYSQL_PORT=3306
    MYSQL_ROOT_PASSWORD= if you are using the root user same as MYSQL_PASSWORD
   ```
    
3. If you want to use XDEBUG then set the `PHP_FPM_INSTALL_XDEBUG` variable to `true`

### Configuring Laravel

1. Navigate to the project's root directory and create the `.env` file with `cp .env.example .env`

2. Open your Laravel’s `.env` file and update the following variables:

   ```
   DB_CONNECTION=mysql
   DB_HOST=mysql
   DB_PORT=3306
   DB_DATABASE= laradock MYSQL_DATABASE variable's value
   DB_USERNAME= laradock MYSQL_USER variable's value
   DB_PASSWORD= laradock MYSQL_PASSWORD variable's value
   ```

### Building Laradock

1. Navigate to the `laradock` folder and start your docker containers with `docker-compose up -d --build workspace nginx mysql` _Note: The building process might take a while_

2. Bash into the `workspace` container with `docker-compose exec workspace bash`

3. Install the composer packages with `composer install`

4. Install the npm packages with `npm install`

5. Compile the assets with `npm run dev`

6. Generate your application key with `php artisan key:generate`

7. Run the migrations with `php artisan migrate`

8. Well done! Visit `http://localhost`

#### Full list of build commands

```
docker-compose up -d --build workspace nginx mysql
docker-compose exec workspace bash
composer install
npm install
npm run dev
php artisan key:generate
php artisan migrate
```
