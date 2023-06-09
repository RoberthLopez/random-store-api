import express, {
  Express,
  Response,
  Request,
  NextFunction,
  Router,
} from "express";
import { UserService } from "../services/user.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} from "../schema/user.schema";
import User from "../db/models/user.model";

const router: Router = express.Router();
const service: UserService = new UserService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users: User[] = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user: User | null = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    try {
      const body: User = req.body;
      const newCategory: User = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body: User = req.body;
      const user: User | undefined = await service.update(id, body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
