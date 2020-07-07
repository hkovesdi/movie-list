# About the application
Laravel + Vue.js app for creating a movie list where you can keep track which movies you are currently watching / watched and lets you rate them.

## Project setup
Make sure [docker desktop](https://www.docker.com/products/docker-desktop "Docker dekstop") is installed on your machine if you are using windows or mac, or docker-compose if you are using linux.

### Configuring laradock
1. Navigate to the laradock folder and create your ```.env``` file: ``` cp env-example .env ```

2. Update your env file with the following:  
   ``` WORKSPACE_INSTALL_MONGO=true ```  
   ``` PHP_FPM_INSTALL_MONGO=true ```  
3. If you are using <b>windows</b> you need to change the value of ```DATA_PATH_HOST``` variable to ```/Users/yourWindowsUserName/.laradock/data``` otherwise the mongo container will not start
### Configuring laravel
1. Navigate to the project's root directory and create the ```.env``` file: ``` cp .env.example .env ```

2. Add the MongoDB configurations to the ```config/database.php``` configuration file:  
    ```
    'connections' => [

        'mongodb' => [
            'driver'   => 'mongodb',
            'host'     => env('DB_HOST', 'localhost'),
            'port'     => env('DB_PORT', 27017),
            'database' => env('DB_DATABASE', 'database'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'options'  => [
                'database' => 'admin',
            ]
        ],

        // ...

    ],
    ```
3. Open your Laravel’s ```.env``` file and update the following variables:  
   ``` DB_CONNECTION=mongodb ```  
   ``` DB_HOST=mongo ```  
   ``` DB_PORT=27017 ```  
   ``` DB_DATABASE=database ```  
   ``` DB_USERNAME= ```  
   ``` DB_PASSWORD= ```  

4. Navigate to the ```laradock``` folder and start your docker containers: ``` docker-compose up -d --build workspace nginx mongo ```  
   <sub>Note: The building process might take a while</sub>

5. Bash into the ```workspace``` container: ```docker-compose exec workspace bash```

6. Install the composer packages: ``` composer install ```

7. Install the npm packages:
   ``` npm install ```  
8. Generate your application key: ```php artisan key:generate ```

9. Run the migrations: ``` php artisan migrate ```

10. Visit localhost to see the app
