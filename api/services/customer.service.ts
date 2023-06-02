import boom from "@hapi/boom";
import Customer from "../db/models/customer.model";
import User from "../db/models/user.model";

export class CustomerService {
  constructor() {}

  async find(): Promise<Customer[]> {
    const res: Customer[] = await Customer.findAll({
      include: ["user"],
    });
    return res;
  }

  async findOne(id: string): Promise<Customer | null> {
    const res: Customer | null = await Customer.findByPk(id);
    if (!res) {
      throw boom.notFound("User not found");
    }
    return res;
  }

  async create(data: Partial<Customer>): Promise<Customer> {
    const newCustomer: Customer = await Customer.create(data, {
      include: ["user"],
    });
    return newCustomer;
  }

  async update(id: string, data: Partial<Customer>) {
    const customer: Customer | null = await this.findOne(id);
    const res: Customer | undefined = await customer?.update(data);
    return res;
  }
  async delete(id: string) {
    const customer: Customer | null = await this.findOne(id);
    const res = await customer?.destroy();
    return res;
  }
}
