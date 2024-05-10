//#region imports
import { response } from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import config from "../config.js";

//#region responses
import constantsError from "../middlewares/const/constantsError.js";

import {
    errorResponse,
    errorResponseWithReplace,
    errorResponse500
} from "../middlewares/errorControl.js";
//#endregion responses

//#endregion imports


//#region auth
export const signUp = async (req, res = response) => {
    try {
        // Getting the Request Body
        const {
            username,
            password,
        } = req.body;

        // Creating a new User Object
        const newUser = await User.create({
            username,
            password
        });

        // Create a token
        const token = jwt.sign({
            id: newUser.id
        }, config.SECRET, {
            expiresIn: config.TOKEN_SESSION_LIVE
        });

        res.set(config.TOKEN_SESSION, token).json({
            user: newUser
        });
    } catch (error) {
      errorResponse500(res, error);
    }
};

export const signIn = async (req, res = response) => {
    try {
      // Request or username
      User.findOne({
        where: {
          username: req.body.username
        }
        }).then(async (userModel) => {
          if (!userModel) {
            return errorResponseWithReplace(res, constantsError.ERROR_MODEL_NO_EXIST_CODE, ["usuario", req.body.username]);
          } else {
            if (!userModel.dataValues.password || 
                !await userModel.validPassword(req.body.password, userModel.dataValues.password)) {
                  errorResponse(res, constantsError.ERROR_PASSWORD_FAIL_CODE);
            } else {
              const token = jwt.sign({
                  id: userModel.id
              }, config.SECRET, {
                  expiresIn: config.TOKEN_SESSION_LIVE
              });
    
              const userRes = await User.findOne({
                where: { id: userModel.id },
                attributes: ["id", "username"],
              });

              res.set(config.TOKEN_SESSION, token).json({
                user: userRes
              });
            }
          }
        });

    } catch (error) {
      errorResponse500(res, error);
    }
};

//#endregion