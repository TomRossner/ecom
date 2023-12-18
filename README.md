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

## Features

1. Ecom is fully responsive and will look great on any device.
2. While shop items are being loaded, a shop skeleton is being displayed for better UX.
3. Shop items can be added to the cart and are being persisted in LocalStorage.
4. The items' quantity can be modified in the cart and when adding the same item multiple times, while also being updated in the LocalStorage.
5. When a cart item's quantity meets 0, the item is being removed from the cart and the cdart is being updated in the LocalStorage.
6. Checkout form inputs are being validated using RegExp patterns and constants keeping track of min and max lengths.
7. All cart actions and states are created within the CartContext.
8. Once an order has been placed, the user can see the order history, until the session is ended. The user can see past orders after completing an order on the new session.
9. If an order has failed, an error is being displayed to let the user know it went wrong, and can be redirected to the cart page with the displayed button below the error.
10. If an order succeeded, a confirmation message is being displayed including the last order details.

Enjoy :)

