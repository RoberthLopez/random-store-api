import express, { Express } from "express";
import cors from "cors";
import routerApi from "../routes";
import {
  logErrors,
  errorHandler,
  boomErrorHandler,
} from "../middlewares/error.handler";

export class Server {
  private static instance: Server;
  private app: Express;
  private port: string | number;

  private constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
  }

  static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  escuchar(): void {
    this.app.listen(this.port, () => {
      console.log("Mi port" + this.port);
    });
  }

  enableCors() {
    this.app.use(cors());
  }

  middleware() {
    this.app.use(express.json());
  }

  customMiddlewares(): void {
    this.app.use(logErrors);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  routes(): void {
    routerApi(this.app);
  }
}
