import constantsError from "./const/constantsError.js";

const getError = (code) => {

    var htttpCode, message;

    switch (code) {
        //#region auth
        case constantsError.ERROR_USER_NO_AUTHORIZED_CODE:
            htttpCode = 401;
            message = constantsError.ERROR_USER_NO_AUTHORIZED_MESSAGE;
            break;
        case constantsError.ERROR_SING_IN_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_SING_IN_CODE;
            break;
        case constantsError.ERROR_SING_UP_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_SING_UP_MESSAGE;
            break;
        case constantsError.ERROR_PARAM_EXIST_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_PARAM_EXIST_MESSAGE;
            break;
        case constantsError.ERROR_PARAM_USE_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_PARAM_USE_MESSAGE;
            break;
        case constantsError.ERROR_PASSWORD_FAIL_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_PASSWORD_FAIL_MESSAGE;
            break;
        case constantsError.ERROR_TOKEN_EXPIRED_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_TOKEN_EXPIRED_MESSAGE;
            break;
        case constantsError.ERROR_PASSWORD_LENGTH_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_PASSWORD_LENGTH_MESSAGE;
            break;
        case constantsError.ERROR_PASSWORD_VALID_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_PASSWORD_VALID_MESSAGE;
            break;
        case constantsError.ERROR_USERNAME_LENGTH_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_USERNAME_LENGTH_MESSAGE;
            break;
        case constantsError.ERROR_EMAIL_VALID_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_EMAIL_VALID_MESSAGE;
            break;
        case constantsError.ERROR_PHONE_VALID_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_PHONE_VALID_MESSAGE;
            break;
        case constantsError.ERROR_CODE_VALID_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_CODE_VALID_MESSAGE;
            break;
            //#endregion

            //#region request
        case constantsError.ERROR_DATA_HEADER_REQUIRED_CODE:
            htttpCode = 401;
            message = constantsError.ERROR_DATA_HEADER_REQUIRED_MESSAGE;
            break;
        case constantsError.ERROR_DATA_BODY_REQUIRED_CODE:
            htttpCode = 422;
            message = constantsError.ERROR_DATA_BODY_REQUIRED_MESSAGE;
            break;
            //#endregion

            //#region model
        case constantsError.ERROR_MODEL_NO_ACTIVE_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_NO_ACTIVE_MESSAGE;
            break;
        case constantsError.ERROR_MODEL_NO_EXIST_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_NO_EXIST_MESSAGE;
            break;
        case constantsError.ERROR_MODEL_CREATE_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_CREATE_MESSAGE;
            break;
        case constantsError.ERROR_MODEL_UPDATE_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_UPDATE_MESSAGE;
            break;
        case constantsError.ERROR_MODEL_DELETE_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_DELETE_MESSAGE;
            break;
        case constantsError.ERROR_MODEL_ID_INVALID_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MODEL_ID_INVALID_MESSAGE;
            break;
            //#endregion

            //#region dota
        case constantsError.ERROR_MATCHID_LENGTH_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_MATCHID_LENGTH_MESSAGE;
            break;
        case constantsError.ERROR_STEAMID_LENGTH_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_STEAMID_LENGTH_MESSAGE;
            break;
        case constantsError.ERROR_STEAMID_VALID_CODE:
            htttpCode = 400;
            message = constantsError.ERROR_STEAMID_VALID_MESSAGE;
            break;
            //#endregion

            //#region pay
        case constantsError.ERROR_PAY_FAIL_CODE:
            htttpCode = 402;
            message = constantsError.ERROR_PAY_FAIL_MESSAGE;
            break;
            //#endregion

        default:
            htttpCode = 500;
            message = constantsError.ERROR_NO_DEFINED_MESSAGE;
            break
    }

    return {
        code: code,
        htttpCode: htttpCode,
        message: message
    };

};

const errorResponse = async (res, code, title = "Error") => {

    const error = getError(code);

    return res.status(error.htttpCode).json({
        error: {
            code: code,
            message: error.message,
            title: title
        }
    });

};

const errorResponseWithReplace = async (res, code, replace, title = "Error") => {

    var error = getError(code);
    replace.forEach(function (element, index) {
        error.message = error.message.replace('{' + index + '}', element);
    });

    return res.status(error.htttpCode).json({
        error: {
            code: code,
            message: error.message,
            title: title
        }
    });

};

const errorResponse500 = async (res, error, title = "Error") => {

    return res.status(500).json({
        error: {
            code: constantsError.ERROR_NO_DEFINED_CODE,
            message: constantsError.ERROR_NO_DEFINED_MESSAGE,
            title: title,
            error: error.message
        }
    });

};

export {
    errorResponse,
    errorResponseWithReplace,
    errorResponse500
};
