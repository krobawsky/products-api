import User from "../models/User.js";

import config from "../config.js";
import constantsError from "./const/constantsError.js";

import {
  errorResponse500,
  errorResponseWithReplace
} from "./errorControl.js";

const checkDuplicateUsername = async (req, res, next) => {
  try {

    if (req.body.username) {
      const user = await User.findOne({
        where: { username: req.body.username }
      });
      if (user)
        return errorResponseWithReplace(res, constantsError.ERROR_PARAM_EXIST_CODE, ["username", req.body.username]);
    }
    next();
  } catch (error) {
    errorResponse500(res, error);
  }
};

export {
  checkDuplicateUsername
};