import { Server } from "./class/server";
import { sequelize } from "./libs/sequelize";
import setupModels from "./db/models";

const app = Server.getInstance();

setupModels(sequelize);
app.enableCors();
app.middleware();
app.routes();
app.customMiddlewares();
app.escuchar();
