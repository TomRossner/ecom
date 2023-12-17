### Ecom

1. Requirements:
  - NodeJS & npm
  - Python 3
  - pgAdmin 4

2. In pgAdmin, create a new Database called ```ecomDB``` .

3. If needed, edit the .env file accordingly. The .env file should look like so:

  ```bash
SECRET_KEY='some-secretKey-in-settings.py'
DB_NAME=ecomDB
DB_USER=postgres
DB_PASSWORD=admin
DB_PORT=5433
  ```
The ```SECRET_KEY``` is the Django secret key which can be found in ```server/config/settings.py```

Make sure ```DB_NAME = ecomDB``` and ```DB_PORT``` matches the port you have set up.

4. Install frontend dependencies

```bash
npm i
```
5. Run the API

```bash
npm run api
```
6. Run the app in development mode

```bash
npm run dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the Ecom web application.


## About Ecom

Ecom is a Full-Stack e-commerce application developed with NextJS, TypeScript, TailwindCSS, Django and PostgreSQL.



