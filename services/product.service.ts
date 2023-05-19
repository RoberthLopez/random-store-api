import { faker } from "@faker-js/faker";
import boom from "@hapi/boom";

class ProductService {
  products: Array<Product>;

  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit: number = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data: Product) {
    const newProduct: Product = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 3000);
    });
  }

  async findOne(id: string) {
    const product: Product | undefined = this.products.find(
      (item) => item.id === id
    );
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }
    return product;
  }

  async update(id: string, changes: Product): Promise<Product> {
    const index: number = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    const product: Product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id: string): Promise<{}> {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Product not found");
    }
    this.products = this.products.filter((item) => item.id !== id);
    return { id };
  }
}

export default ProductService;
