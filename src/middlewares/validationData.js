import { validationResult } from "express-validator";

import constantsError from "./const/constantsError.js";
import {
  errorResponse,
  errorResponseWithReplace
} from "./errorControl.js";

const validationBody = (req, res, next) => {
  if (req.body) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errors.array()[0].msg == constantsError.ERROR_DATA_BODY_REQUIRED_CODE ? 
        errorResponseWithReplace(res, errors.array()[0].msg, [errors.array()[0].path]) : 
        errorResponse(res, errors.array()[0].msg);
    }
  }

  next();
};

export {
  validationBody
};