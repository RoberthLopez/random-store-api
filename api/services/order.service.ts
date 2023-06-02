import boom from "@hapi/boom";
import Order from "../db/models/order.model";
import OrderProduct from "../db/models/order-product.model";

class OrderService {
  constructor() {}
  async create(data: Partial<Order>) {
    const newOrder = await Order.create(data);
    return newOrder;
  }

  async find() {
    const res = await Order.findAll();
    return res;
  }

  async findOne(id: any) {
    const res = Order.findByPk(id, {
      include: [
        {
          association: "customer",
          include: ["user"],
        },
        "products",
      ],
    });
    if (!res) {
      throw boom.notFound("Order not found");
    }
    return res;
  }

  async update(id: any, changes: any) {
    return {
      id,
      changes,
    };
  }

  async delete(id: any) {
    return { id };
  }

  async addItem(data: any) {
    const newItem = await OrderProduct.create(data);
    return newItem;
  }
}

export default OrderService;
