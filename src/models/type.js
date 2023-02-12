import { DataTypes } from "sequelize";

import dbConnection from "../database/connection";

const TypeContact = dbConnection.define("type_contact", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default TypeContact;
