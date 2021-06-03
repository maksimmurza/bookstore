# Book Store

e-commerce web application on the MERN stack

## 🪁 [Try it out](https://bookstore-commerce.herokuapp.com/)

#### Created with:

-   Typescript
-   ReactJS
-   Redux
-   Bootstrap
-   express.js
-   mongoose

#### Tools and libs:

-   dotenv
-   nodemon (autorestart server)
-   concurrently
-   bcryptjs
-   jsonwebtoken
-   react-paypal-button-v2
-   morgan (logger)
-   multer (uploading images)

Inspired and partly guided by [Brad Traversy](https://github.com/bradtraversy) [course](https://www.udemy.com/course/mern-ecommerce/)

#### Dev:

0. [Node.js](https://nodejs.org/en/) is required. (v.14.16.0 was used in project)
1. You need to have Paypal developer account and Mongodb account with created database
2. Put constants listed below in the `.env` file at root of project:

```
NODE_ENV=...
MONGO_URI=...
JWT_SECRET=...
PAYPAL_CLIENT_ID=...
```

3. Run `npm i` in the root folder. Repeat it in the frontend folder
4. Run `npm start` in the root (or `npm run server` and `npm run client` separately)
