import express, { Express, Router } from "express";
import productRouter from "./products.router";
import usersRouter from "./user.router";
import categoriesRouter from "./categories.router";
import ordersRouter from "./orders.router";
import customersRouter from "./customer.router";

function routerApi(app: Express) {
  const router: Router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/users", usersRouter);
  router.use("/categories", categoriesRouter);
  router.use("/orders", ordersRouter);
  router.use("/customers", customersRouter);
}

export default routerApi;
