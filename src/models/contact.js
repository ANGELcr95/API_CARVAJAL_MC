import { DataTypes, Sequelize } from "sequelize";
import dbConnection from "../database/connection";

const Contact = dbConnection.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  country: {
    type: DataTypes.STRING,
  },
  cell_phone: {
    type: DataTypes.NUMBER,
  },
  address: {
    type: DataTypes.STRING,
  },
  type_id: {
    type: Sequelize.INTEGER,
  },
  user_id: {
    type: DataTypes.NUMBER,
    allowNull: false,
    isInt: true,
  },
});

export default Contact;
