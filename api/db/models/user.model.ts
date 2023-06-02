import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  HasOne,
  ForeignKey,
} from "sequelize-typescript";
import Customer from "./customer.model";

export const userModel = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  role: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "customer",
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
  tableName: "users",
  timestamps: true,
})
class User extends Model {
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
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  password!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    defaultValue: "customer",
  })
  role!: string;

  @HasOne(() => Customer)
  customer!: Customer;

  // @ForeignKey(() => Customer)
  // // @Column({
  // //   allowNull: true,
  // //   type: DataType.INTEGER,
  // //   field: "user_id",
  // //   unique: true,
  // // })
  // userId!: number;
}

export default User;
