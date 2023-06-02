import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import { validatorHandler } from "../middlewares/validator.handler";
import { createOrderSchema, getOrderSchema } from "../schema/order.schema";
import OrderService from "../services/order.service";
import Order from "../db/models/order.model";
import { createOrderProductSchema } from "../schema/order-product.schema";

const router: Router = express.Router();
const service = new OrderService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json(await service.find());
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getOrderSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const order: Order | null = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createOrderSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/add-item",
  validatorHandler(createOrderProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newOrder = await service.addItem(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
