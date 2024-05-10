//#region imports
import {
  Router
} from "express";
const router = Router();
import { check } from "express-validator";

import config from "../config.js";
import constantsError from "../middlewares/const/constantsError.js";

import * as authCtrl from "../controllers/auth.controller.js";

//#region middlewares
import {
  verifySignup,
  validationData
} from "../middlewares/index.js";
//#endregion 

//#endregion imports

//#region autth
router.post(
  "/signup",
  [
      check('username').
      exists().withMessage(constantsError.ERROR_DATA_BODY_REQUIRED_CODE).
      isLength({
          min: config.USERNAME_LENGHT
      }).withMessage(constantsError.ERROR_USERNAME_LENGTH_CODE),
      check('password').
      exists().withMessage(constantsError.ERROR_DATA_BODY_REQUIRED_CODE).
      isLength({
          min: config.PASSWORD_LENGHT
      }).withMessage(constantsError.ERROR_PASSWORD_LENGTH_CODE),
      verifySignup.checkDuplicateUsername,
      validationData.validationBody
  ], authCtrl.signUp
);

router.post("/signin",
  [
      check('username').
      exists().withMessage(constantsError.ERROR_DATA_BODY_REQUIRED_CODE).
      isLength({
          min: config.USERNAME_LENGHT
      }).withMessage(constantsError.ERROR_USERNAME_LENGTH_CODE),
      check('password').
      exists().withMessage(constantsError.ERROR_DATA_BODY_REQUIRED_CODE).
      isLength({
          min: config.PASSWORD_LENGHT
      }).withMessage(constantsError.ERROR_PASSWORD_LENGTH_CODE).
      matches(/\d/).withMessage(constantsError.ERROR_PASSWORD_VALID_CODE),
      validationData.validationBody
  ], authCtrl.signIn);
//#endregion


export default router;