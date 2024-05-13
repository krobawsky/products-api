import Sequelize from "sequelize";
import config from "../config.js";

export const sequelize = new Sequelize(
  config.PG_DB_NAME,
  config.PG_DB_USER,
  config.PG_DB_PASSWORD,
  {
    host: config.PG_DB_HOST,
    dialect: "postgres",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  }
);