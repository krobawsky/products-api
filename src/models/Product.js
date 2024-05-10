
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    handle: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    sku: {
      type: DataTypes.BIGINT,
    },
    grams: {
      type: DataTypes.DOUBLE,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    compare_price: {
      type: DataTypes.INTEGER,
    },
    barcode: {
      type: DataTypes.BIGINT,
    }
  },
  {
    timestamps: false,
  }
);