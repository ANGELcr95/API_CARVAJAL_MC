import { DataTypes } from "sequelize";

import dbConnection from "../database/connection";

const User = dbConnection.define("user", {
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
    unique: true,
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
  image: {
    type: DataTypes.TEXT,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  state: {
    type: DataTypes.BOOLEAN,
    defaultValue: 1,
  },
});

export default User;
