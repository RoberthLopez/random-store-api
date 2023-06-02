import { Sequelize } from "sequelize-typescript";
import User from "./user.model";
import Customer from "./customer.model";
import Category from "./category.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderProduct from "./order-product.model";

const setupModels = (sequelize: Sequelize) => {
  sequelize.addModels([User, Customer, Category, Product, Order, OrderProduct]); // Agregar los modelos que deseas inicializar
};

export default setupModels;
