import constantsSuccess from "./const/constantsSuccess.js";

const getSucces = (code) => {

    var htttpCode, message;

    switch (code) {
        //#region auth
        case constantsSuccess.SUCCESS_PASSWORD_CHANGE_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_PASSWORD_CHANGE_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_SEND_EMAIL_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_SEND_EMAIL_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_SEND_SMS_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_SEND_SMS_MESSAGE;
            break;
            //#endregion

            //#region security
        case constantsSuccess.SUCCESS_TWO_AUTH_UPDATE_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_TWO_AUTH_UPDATE_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_VALIDATE_ACOUNT_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_VALIDATE_ACOUNT_MESSAGE;
            break;
            //#endregion

            //#region request
            //#endregion

            //#region model
        case constantsSuccess.SUCCESS_MODEL_CREATE_CODE:
            htttpCode = 201;
            message = constantsSuccess.SUCCESS_MODEL_CREATE_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_MODEL_UPDATE_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_MODEL_UPDATE_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_MODEL_DELETE_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_MODEL_DELETE_MESSAGE;
            break;
        case constantsSuccess.SUCCESS_MODEL_DATA_CHANGE_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_MODEL_DATA_CHANGE_MESSAGE;
            break;
            //#endregion

            //#region pay
        case constantsSuccess.SUCCESS_PAY_CODE:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_PAY_MESSAGE;
            break;
            //#endregion

        default:
            htttpCode = 200;
            message = constantsSuccess.SUCCESS_GENERAL_CODE;
            break
    }

    return {
        code: code,
        htttpCode: htttpCode,
        message: message
    };

};

const successResponse = async (res, code, data = {}, title = "Success") => {

    const success = getSucces(code);

    return res.status(success.htttpCode).json({
        success: {
            code: code,
            message: success.message,
            title: title
        },
        data: data
    });

};

const successResponseWithReplace = async (res, code, replace, data = {}, title = "Success") => {

    const success = getSucces(code);
    replace.forEach(function (element, index) {
        success.message = success.message.replace('{' + index + '}', element);
    });

    return res.status(success.htttpCode).json({
        success: {
            code: code,
            message: success.message,
            title: title
        },
        data: data
    });

};

export {
    successResponse,
    successResponseWithReplace
};