import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  HasMany,
} from "sequelize-typescript";

import User from "./user.model";
import Order from "./order.model";

export const TABLE_NAME = "customers";

export const customerModel = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
    allowNull: false,
    field: "last_name",
  },
  phone: {
    type: DataType.STRING,
    allowNull: true,
  },
  createdAt: {
    allowNull: false,
    type: DataType.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataType.DATE,
  },
  userId: {
    field: "user_id",
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    unique: true,
  },
};

@Table({
  tableName: "customers",
  timestamps: true,
})
class Customer extends Model {
  @PrimaryKey
  @Column({
    autoIncrement: true,
    allowNull: false,
    type: DataType.INTEGER,
  })
  id!: number;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  })
  name!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    field: "last_name",
  })
  lastName!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING,
  })
  phone!: string;

  @ForeignKey(() => User)
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    field: "user_id",
    unique: true,
  })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Order)
  orders!: Order;
}

export default Customer;
