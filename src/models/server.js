import express from "express";
import cors from "cors";

import fileUpload from "express-fileupload";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

import auth from "../routes/auth";
import contacts from "../routes/contacts";
import uploads from "../routes/uploads";
import users from "../routes/users";
import db from "../database/connection";
import { swaggerSpec } from "../config";

export class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3001;
    this.swaggerSpec = swaggerSpec;
    this.paths = {
      auth: "/api/auth",
      contacts: "/api/contacts",
      uploads: "/api/uploads",
      users: "/api/users",
      swagger: "/api-doc",
    };

    this.databaseConnect();
    this.middlewares();
    this.routes();
  }

  async databaseConnect() {
    try {
      await db.authenticate();
      console.log("deb connection on ");
    } catch (error) {
      throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.contacts, contacts);
    this.app.use(this.paths.uploads, uploads);
    this.app.use(this.paths.users, users);
    this.app.use(this.paths.users, users);
    this.app.use(
      this.paths.swagger,
      swaggerUI.serve,
      swaggerUI.setup(swaggerJsDoc(this.swaggerSpec))
    );
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running on PORT ${this.port}`);
    });
  }
}
