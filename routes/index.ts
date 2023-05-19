import productRouter from "./products.router";
import express, { Express, Router } from "express";

function routerApi(app: Express) {
  const router: Router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
}

export default routerApi;
