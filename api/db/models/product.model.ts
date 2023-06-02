import {
  Model,
  Column,
  Table,
  DataType,
  PrimaryKey,
  BelongsTo,
  ForeignKey,
  AutoIncrement,
  AllowNull,
} from "sequelize-typescript";

import Category from "./category.model";

export const TABLE_NAME = "products";

export const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataType.STRING,
  },
  image: {
    allowNull: false,
    type: DataType.STRING,
  },
  description: {
    allowNull: false,
    type: DataType.TEXT,
  },
  price: {
    allowNull: false,
    type: DataType.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataType.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataType.DATE,
  },
  categoryId: {
    field: "category_id",
    allowNull: false,
    type: DataType.INTEGER,
    references: {
      model: "categories",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

@Table({
  tableName: "products",
  timestamps: true,
})
class Product extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.INTEGER)
  id!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  image!: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description!: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  price!: number;

  @ForeignKey(() => Category)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: "category_id",
  })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;
}

export default Product;
