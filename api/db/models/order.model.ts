import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  AutoIncrement,
  AllowNull,
  AfterFind,
  Scopes,
} from "sequelize-typescript";

import Product from "./product.model";
import Customer from "./customer.model";
import OrderProduct from "./order-product.model";

interface ProductItems extends Product {
  OrderProduct: OrderProduct;
}

export const TABLE_NAME = "orders";

export const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  customerId: {
    field: "customer_id",
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: "customers",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    allowNull: false,
    type: DataType.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataType.DATE,
  },
};

@Table({
  tableName: "orders",
  timestamps: true,
})
class Order extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Customer)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "customer_id",
  })
  customerId!: number;

  @BelongsTo(() => Customer)
  customer!: Customer;

  @BelongsToMany(() => Product, () => OrderProduct)
  products!: ProductItems[];

  @Column(DataType.VIRTUAL)
  get total(): number {
    if (this.products.length > 0) {
      return this.products.reduce((total, item) => {
        return total + item.price * item.OrderProduct.amount;
      }, 0);
    }
    return 0;
  }
}

export default Order;
