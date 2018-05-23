![Vault](https://static.kevinlin.info/blog/vault/banner.png)

# Installation

Following are instructions for manual and Dockerized deployment of a Vault instance. It is highly recommended to install Vault manually.

## Manual

### Prerequisites

* You need Node and `npm`. ([Reference](https://nodejs.org/en/))
* You need a MySQL database. ([Reference](https://dev.mysql.com/doc/))
* You need any web server capable of reverse-proxying to the HTTP service. Popular choices include Apache and nginx.

### Installation

1. Get the code and install dependencies:

   ```bash
   $ git clone https://github.com/LINKIWI/vault.git
   $ cd vault
   $ npm install
   ```

2. Create a new MySQL database and user for Vault:

   ```sql
   CREATE USER 'vault'@'localhost' IDENTIFIED BY 'super-secret-password';
   CREATE DATABASE vault;
   GRANT ALL ON vault.* TO 'vault'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. You need to set certain runtime configuration environment variables before continuing. Create a file `.env` in the project root based on `.env.example`:

   ```bash
   $ cp .env.example .env
   ```

   Edit `.env` by uncommenting and setting values for (at minimum) the required configuration directives in accordance with the inline documentation.

4. Create all Vault database tables:

   ```bash
   $ npm run vault:init-db
   ```

5. Set the master password used for encryption and decryption:

   ```bash
   $ npm run vault:set-master-password
   # Follow the instructions in the interactive prompts
   ```

6. Build the application:

   ```bash
   $ NODE_ENV=production npm run build
   ```

### Deployment

To run the application, invoke the `start` script. This will start an HTTP server on the port specified in `.env`.

```bash
$ npm run start
```

You can daemonize the application using `systemd`, [`pm2`](https://pm2.keymetrics.io/), or equivalent.

Then, reverse proxy from the web server of your choice to the port on which Vault is listening. An example Apache configuration for a Vault deployment at `/var/www/vault` may look something like this:

```apache
<VirtualHost *:80>
    ServerName vault.example.com

    # This directive is optional; it tells Apache to serve the frontend directly,
    # bypassing the Node HTTP server. It provides a small performance optimization.
    Alias / /var/www/vault/dist/index.html

    ProxyRequests Off
    ProxyPreserveHost On
    ProxyPassMatch ^/$ !
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/

    <Directory /var/www/vault/dist>
        Require all granted
    </Directory>
</VirtualHost>
```

### A word of caution regarding security

Vault deliberately does not ship with a service-level authentication mechanism, apart from a simple single-factor verification of the master encryption/decryption password. If your Vault instance is exposed to the public Internet, anyone who guesses your master password can decrypt all your secrets.

It is highly recommended to gate your Vault instance behind an authentication service (whether a full-fledged SSO solution or web server-level HTTP Basic auth). Please search online for the many ways this can be done.

## Docker

**It is highly recommended to install Vault manually. Please proceed with the following Docker instructions with caution.**

### Prerequisites

* You need Docker. ([Reference](https://docs.docker.com/install/))
* You need Docker Compose. ([Reference](https://docs.docker.com/compose/install/))
* You need any web server capable of reverse-proxying to the HTTP service. Popular choices include Apache and nginx.

### Installation

1. Get the code:

   ```bash
   $ git clone https://github.com/LINKIWI/vault.git
   $ cd vault
   ```

2. You need to set certain runtime configuration environment variables before continuing. Create a file `.env` in the project root based on `.env.example`:

   ```bash
   $ cp .env.example .env
   ```

   Edit `.env` by uncommenting and setting values for desired configuration directives. Namely, the `PORT` environment variable indicates the port to which Docker will bind Vault's HTTP server on `localhost`. The database configuration directives are handled entirely by Docker, so any values set for the `DB_*` directives will be ignored.

3. Pull dependent images and build the Vault Docker image:

   ```bash
   $ docker-compose pull
   $ docker-compose build
   ```

4. Set the master password used for encryption and decryption:

   ```bash
   $ docker-compose run --rm server npm run vault:set-master-password
   # Follow the instructions in the interactive prompts
   ```

### Deployment

To start the service, use Docker Compose:

```bash
$ docker-compose up -d
```

This will start Vault's HTTP server on the port defined as `PORT` in `.env`. The service can then be added to your existing web serving infrastructure with a reverse proxy. Please see the deployment instructions and security advisory in the manual installation instructions.
