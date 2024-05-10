
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

import { sequelize } from "../database/database.js";

var User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    }
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
        const salt = await bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
        }
      },
    },
    instanceMethods: {
      validPassword(password) {
          return bcrypt.compare(password, this.password);
      }
    }
  }
);

User.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
}

export default User;