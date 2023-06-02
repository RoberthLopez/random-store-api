import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  HasMany,
} from "sequelize-typescript";

import Product from "./product.model";

export const TABLE_NAME = "categories";

export const CategorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataType.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataType.STRING,
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
  tableName: "categories",
  timestamps: true,
})
class Category extends Model {
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
  })
  image!: string;

  @HasMany(() => Product)
  products!: Product;
}

export default Category;
