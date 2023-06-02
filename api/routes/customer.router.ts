import express, {
  Express,
  Router,
  Request,
  Response,
  NextFunction,
} from "express";
import { CustomerService } from "../services/customer.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getCustomerSchema,
  updateCustomerSchema,
  createCustomerSchema,
} from "../schema/customer.schema";
import Customers from "../db/models/customer.model";

const router: Router = express.Router();
const service: CustomerService = new CustomerService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customers = await service.find();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const customer = await service.findOne(id);
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const deleteCustomer = await service.delete(id);
      res.json(deleteCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCustomerSchema, "params"),
  validatorHandler(updateCustomerSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const data: Customers = req.body;
      const updateCustomer: Customers | undefined = await service.update(
        id,
        data
      );
      res.json(updateCustomer);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCustomerSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: Customers = req.body;
      const createCustomer: Customers | undefined = await service.create(data);
      res.json(createCustomer);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
