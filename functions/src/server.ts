import * as express from "express";
import * as http from "https";
import { Controller } from "./controller";
import * as cors from "cors";

export class Server {
  public server = express();
  private http: any;

  private whiteList = ["http://localhost:4200"];
  private corsOptions = {
    origin: (origin: any, callback: any) => {
      if (this.whiteList.indexOf(origin) != -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  constructor(port: number, controllers?: Controller[]) {
    this.startServer(port, controllers);
  }

  private startServer(port: number, controllers?: Controller[]) {
    this.http = http.createServer(this.server);
    this.http.on("error", (error: any) => {
      if (error.code === "EADDRINUSE") {
        this.http?.close();
        this.startServer((port += 1), controllers);
        return;
      }
    });
    this.setup(port, controllers);
  }

  private setup(port: number, controllers?: Controller[]) {
    this.server.use(cors(this.corsOptions));
    this.initaliseControllers(controllers ?? []);
  }

  initaliseControllers(controllers: Controller[]) {
    controllers.forEach((controller: Controller) => {
      controller.initaliseRoutes();
      this.server.use(controller.path, controller.router);
    });
  }
}
