### Ecom

1. Requirements:
  - NodeJS & npm
  - Python 3
  - pgAdmin 4

2. Clone the repo
  ```git clone https://github.com/TomRossner/ecom.git```

3. In pgAdmin, create a new Database called ```ecomDB``` .

4. If needed, edit the .env file accordingly. The .env file should look like so:

  ```bash
SECRET_KEY='some-secretKey-in-settings.py'
DB_NAME=ecomDB
DB_USER=postgres
DB_PASSWORD=admin
DB_PORT=5433
  ```
The ```SECRET_KEY``` is the Django secret key which can be found in ```server/config/settings.py```

Make sure ```DB_NAME = ecomDB``` and ```DB_PORT``` matches the port you have set up.

5. Install frontend dependencies

```bash
npm i
```
6. Run the API

```bash
npm run api
```
7. Run the app in development mode

```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000) with your browser to see the Ecom web application.


## About Ecom

Ecom is a Full-Stack e-commerce application developed with NextJS, TypeScript, TailwindCSS, Django and PostgreSQL.

## Known problems

- CSRF: disabled CSRF protection for POST HTTP requests, couldn't get it to work on time but still was able to pull the CSRF token and serve it as a header.
- Shop items stocks: I wanted to update stocks when adding an item to the cart but didn't find the time to do so.
- Auth: It would be easier to keep track of orders using an authentication system, but wasn't asked to do that.

