import { Server } from "./class/server";

const app = Server.getInstance();

app.enableCors();
app.middleware();
app.routes();
app.customMiddlewares();
app.escuchar();
