require("dotenv").config();
const fs = require("fs");
const https = require("https");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.API_PORT;

const transactionsRouter = require('./src/routers/transactions/index')
const categoriesRouter = require('./src/routers/categories/index')
const warehouseRouter = require('./src/routers/warehouses/index')
const addressRouter = require('./src/routers/addressUsers/index')
const productsRouter = require('./src/routers/products/index')
const userRouter = require('./src/routers/users/index');
const cartRouter = require('./src/routers/carts/index')

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.status(200).send("4-Warehouse API");
});

app.use("/transactions", transactionsRouter)
app.use("/categories", categoriesRouter);
app.use("/warehouses", warehouseRouter);
app.use("/products", productsRouter);
app.use("/address", addressRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);

app.use((error, req, res, next) => {
  console.log({ error });
  res.status(500).send({
    status: "ERROR",
    message: error.message,
    data: error,
  });
});

if (process.env.NODE_ENV == "production") {
  https
    .createServer(
      {
        key: fs.readFileSync("server.key"),
        cert: fs.readFileSync("server.cert"),
      },
      app
    )
    .listen(port, () => {
      console.log(`Listening at ${port}`);
    });
} else {
  app.listen(port, (err) => {
    if (err) return cosole.log({ err });
    console.log(`Api is running at port ${port}`);
  });
}
