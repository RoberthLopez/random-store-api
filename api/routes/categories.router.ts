import express, {
  Express,
  Request,
  Response,
  NextFunction,
  Router,
} from "express";
import { CategoryService } from "../services/category.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from "../schema/category.schema";

const router: Router = express.Router();
const service: CategoryService = new CategoryService();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createCategorySchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
  validatorHandler(updateCategorySchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getCategorySchema, "params"),
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
