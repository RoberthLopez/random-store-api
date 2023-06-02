import boom from "@hapi/boom";
import Product from "../db/models/product.model";
import { Op, WhereOptions } from "sequelize";

interface Query {
  limit?: number;
  offset?: number;
  price?: number;
  price_min?: number;
  price_max?: number;
}
interface Options {
  include: string[];
  limit?: number;
  offset?: number;
  where?: WhereOptions;
}
class ProductService {
  // products: Array<Product>;

  constructor() {
    // this.products = [];
    // this.generate();
  }

  // generate() {
  //   const limit: number = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       id: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlock: faker.datatype.boolean(),
  //     });
  //   }
  // }

  async create(data: Partial<Product>) {
    const newProduct = await Product.create(data);
    return newProduct;
  }
  async find(query: Query) {
    // const query: string = "SELECT * FROM tasks";
    // const [data] = await sequelize.query(query);
    // return data;
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.products);
    //   }, 3000);
    // });
    const options: Options = {
      include: ["category"],
    };

    const { limit, offset } = query;

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;

    if (price) {
      options.where = { price };
    }

    const { price_min, price_max } = query;

    if (price_min && price_max) {
      options.where = {
        price: {
          [Op.gte]: price_min,
          [Op.lte]: price_max,
        },
      };
    }

    const res = await Product.findAll(options);
    return res;
  }

  async findOne(id: string) {
    // const product: Product | undefined = this.products.find(
    //   (item) => item.id === id
    // );
    // if (!product) {
    //   throw boom.notFound("Product not found");
    // }
    // if (product.isBlock) {
    //   throw boom.conflict("Product is block");
    // }
    // return product;
    const res = await Product.findByPk(id);
    if (!res) {
      throw boom.notFound("Product not found");
    }
    return res;
  }

  async update(id: string, changes: Partial<Product>): Promise<Product> {
    // const index: number = this.products.findIndex((item) => item.id === id);
    // if (index === -1) {
    //   throw boom.notFound("Product not found");
    // }
    // const product: Product = this.products[index];
    // this.products[index] = {
    //   ...product,
    //   ...changes,
    // };
    // return this.products[index];

    const product = await this.findOne(id);
    const updatedProduct = await product?.update(changes);
    return updatedProduct;
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    const deletedProduct = await product?.destroy();
    return deletedProduct;
  }
}

export default ProductService;
