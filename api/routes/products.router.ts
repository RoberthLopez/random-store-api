import express, { Request, Response, Router, NextFunction } from "express";
import ProductService from "../services/product.service";
import { validatorHandler } from "../middlewares/validator.handler";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} from "../schema/product.schema";

const service = new ProductService();
const router: Router = express.Router();

// Trae la lista de productos y podemos enviarle una query ?size=10 con el numero de productos que necesitamos
router.get("/", async (req: Request, res: Response) => {
  const products: Product[] = await service.find();
  res.json(products);
});

// Los endpoint traidos de forma especifica deben ir antes de los dinamicos

// Filtrar productos
router.get("/filter", (req: Request, res: Response) => {
  res.send("yo soy un filter");
});

// Get 1 product
router.get(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error: any) {
      next(error);
    }
  }
);

// Create product
router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req: Request, res: Response) => {
    const body = req.body;
    const newProduct: Product = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// Edit a product partially
router.patch(
  "/:id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product: Product = await service.update(id, body);
      res.status(200).json(product);
    } catch (error: any) {
      next(error);
    }
  }
);

// Delete a product
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

export default router;
