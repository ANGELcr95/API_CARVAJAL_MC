import { Sequelize } from "sequelize";
import { dbConfig } from "../config";

const db = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: "mysql",
});

export default db;
