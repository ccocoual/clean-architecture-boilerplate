# INSTALL

## Environment variables

### back

  * __`DATABASE_TYPE`__
    * Description: database type, can be `postgres` or `sqlite`
    * Example: `postgres`

  * __`DATABASE_NAME`__
    * Description: database name
    * Example: `my-db-name` (or `my-local-db.sqlite` when `DATABASE_TYPE` is `sqlite`)

  * __`DATABASE_HOST`__
    * Description: database host, **not needed when `DATABASE_TYPE` is `sqlite`**
    * Example: `postgres`

  * __`DATABASE_PORT`__
    * Description: database port, **not needed when `DATABASE_TYPE` is `sqlite`**
    * Example: `5432`

  * __`DATABASE_USERNAME`__
    * Description: database username, **not needed when `DATABASE_TYPE` is `sqlite`**
    * Example: `db-username`

  * __`DATABASE_PASSWORD`__
    * Description: database password, **not needed when `DATABASE_TYPE` is `sqlite`**
    * Example: `a-super-secret-password`

  * __`PORT`__
    * Description: the port on which the application will listen
    * Example: `8080`
    * Description: Zoho API calls cache time to live in seconds 

#### How to use them in back
Environment variables are accessible in `back` application using the `EnvironmentConfigService`, and are validated on startup using [Joi](https://github.com/hapijs/joi).
