import dotenv from "dotenv";
import path from "path";

dotenv.config();

export const dbConfig = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: "API CARVAJAL MC",
    version: "1.0.0"
  },
  servers: [
    {
      url: "http://localhost:3001"
    }
  ]
};

export const swaggerSpec = {
  swaggerDefinition,
  apis: [`${path.join(__dirname,"./routes/*.js")}`]
}
