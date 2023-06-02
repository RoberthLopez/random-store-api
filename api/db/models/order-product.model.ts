import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";

import Order from "./order.model";
import Product from "./product.model";

export const TABLE_NAME = "orders_products";

export const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  amount: {
    allowNull: false,
    type: DataType.INTEGER,
  },
  orderId: {
    field: "order_id",
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: "orders",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  productId: {
    field: "product_id",
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: "products",
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
  tableName: "orders_products",
  timestamps: true,
})
class OrderProduct extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.INTEGER,
  })
  amount!: number;

  @ForeignKey(() => Order)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "order_id",
  })
  orderId!: number;

  @HasMany(() => Order, "id")
  order!: Order;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
    type: DataType.INTEGER,
    field: "product_id",
  })
  productId!: number;

  @HasMany(() => Product, "id")
  product!: Product;
}

export default OrderProduct;
