import Sequelize from "sequelize";
import dbconnect from "../utils/dbconnect";
const sequelize = dbconnect.sequelize;
const Op = dbconnect.Op;
const User = sequelize.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    userName: { type: Sequelize.STRING },
    fullName: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
    status: { type: Sequelize.BOOLEAN },
  },
  { timestamps: false, freezeTableName: true, tableName: "Users" }
);

export default User;
