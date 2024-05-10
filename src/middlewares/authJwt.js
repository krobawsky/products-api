import jwt from "jsonwebtoken";
import User from "../models/User.js";

import config from "../config.js";
import constantsError from "./const/constantsError.js";

import {
    errorResponse,
    errorResponseWithReplace,
    errorResponse500
} from "./errorControl.js";

export const verifyToken = async (req, res, next) => {
    let token = req.headers[config.TOKEN_SESSION];

    if (!token) return errorResponseWithReplace(res, constantsError.ERROR_DATA_HEADER_REQUIRED_CODE, [config.TOKEN_SESSION]);

    try {
        var decodedError = "";
        var decodedToken = "";
        jwt.verify(token, config.SECRET, function (err, decoded) {
            if (err) {
                decodedError = err.name;
            }
            decodedToken = decoded;
        });

        if (decodedError.length) {
            switch (decodedError) {
                case 'JsonWebTokenError':
                    return errorResponseWithReplace(res, constantsError.ERROR_DATA_HEADER_REQUIRED_CODE, [config.TOKEN_CODE]);
                case 'TokenExpiredError':
                    return errorResponse(res, constantsError.ERROR_TOKEN_EXPIRED_CODE);
                default:
                    errorResponse500(res, error);
            }
        }
        
        next();
    } catch (error) {
        errorResponse500(res, error);
    }
};

export const verifyTokenCode = async (req, res, next) => {
    let token = req.headers[config.TOKEN_CODE];

    if (!token) return errorResponseWithReplace(res, constantsError.ERROR_DATA_HEADER_REQUIRED_CODE, [config.TOKEN_CODE]);;

    try {

        var decodedError = "";
        var decodedToken = "";
        jwt.verify(token, config.SECRET, function (err, decoded) {
            if (err) {
                decodedError = err.name;
            }
            decodedToken = decoded;
        });

        if (decodedError.length) {
            switch (decodedError) {
                case 'JsonWebTokenError':
                    return errorResponseWithReplace(res, constantsError.ERROR_DATA_HEADER_REQUIRED_CODE, [config.TOKEN_CODE]);
                case 'TokenExpiredError':
                    return errorResponse(res, constantsError.ERROR_TOKEN_EXPIRED_CODE);
                default:
                    errorResponse500(res, error);
            }
        }

        req.userId = decodedToken.id;

        const user = await User.findById(req.userId);
        if (!user) return errorResponseWithReplace(res, constantsError.ERROR_MODEL_NO_EXIST_CODE, ["user", req.userId]);

        req.user = user;
        next();
    } catch (error) {
        errorResponse500(res, error);
    }
};
