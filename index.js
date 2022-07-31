const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// support encoded bodies
app.use(cors());

const productsV1 = require('./routes/products.router.js');
const { authRouter } = require('./routes/authentication.router.js');
const wishlistV1 = require('./routes/wishlist.router.js');
const cartv1 = require('./routes/cart.router.js');
const addressv1 = require('./routes/address.router.js');
const ordersv1 = require('./routes/orders.router.js');

const { initializeDBConnection } = require('./db/db.connect.js');

const PORT = 3010;

// called before any route handler
initializeDBConnection();

app.use('/v1/products', productsV1);
app.use('/v1/wishlist', wishlistV1);
app.use('/v1/auth', authRouter);
app.use('/v1/cart', cartv1);
app.use('/v1/address', addressv1);
app.use('/v1/orders', ordersv1);

app.get('/', (req, res) => {
  res.json('Express Server has Started');
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: 'route not found on server, please check',
    });
});

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({
      success: false,
      message: 'error occured, see the errMessage key for more details',
      errorMessage: err.message,
    });
});

app.listen(PORT, () => {
  console.log('server started on port: ', PORT);
});
