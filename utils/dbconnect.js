import Sequelize from "sequelize";
const sequelize = new Sequelize(
  "test-login", //dbname
  "postgres", //username
  "123456",
  {
    dialect: "postgres",
    host: "localhost",
    operatorsAlias: false,
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 1000,
    },
  }
);

const Op = sequelize.Op;
export default {
  sequelize,
  Op,
};
