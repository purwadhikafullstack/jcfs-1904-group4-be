require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.API_PORT;

const productsRouter = require('./src/routers/products/index');
const categoriesRouter = require('./src/routers/categories/index');
const addressRouter = require('./src/routers/addressUsers/index');
const userRouter = require('./src/routers/users/index');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send('API IS RUNNING');
});

app.use('/products', productsRouter);
app.use('/categories', categoriesRouter);
app.use('/address', addressRouter);
app.use('/users', userRouter);

app.use((error, req, res, next) => {
  console.log({ error });
  res.status(500).send({
    status: 'ERROR',
    message: error.message,
    data: error,
  });
});

app.listen(port, (err) => {
  if (err) return cosole.log({ err });

  console.log(`Api is running at port ${port}`);
});
