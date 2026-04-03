const REGEX_CHECK_ONLY_DIGITS = /^\d+$/;

function sendErrorResponse(response, message){
    response.status(400);
    response.send({success: false, code: 0, body: message})
}

function validateRequestField(value,type,response,valueName){ //allowing for consistent and verbose error messages for basic value validation (Type & if defined)
    if(typeof value === type){
        return true;
    } else {
        sendErrorResponse(response, valueName+" is not a "+type)
        return false;
    }
}

function validateUsername(username,response) {
    let alphaNumeric = /^[0-9A-Za-z]+$/

    if(validateRequestField(username,"string",response,"username")){
        if(alphaNumeric.test(username) && username.length <= 25){
            //username can now be trusted for SQL queries

            

            return true;
        } else {
            sendErrorResponse(response,"Username contains invalid characters");
            return false;
        }
    }  
}

function validatePassword(password,response) {
    let alphaNumericSpecial = /^[0-9A-Za-z#$@&]+$/ 

    if(validateRequestField(password,"string",response,"password")){
        if(alphaNumericSpecial.test(password) && password.length <= 25){
            return true;
        } else {
            sendErrorResponse(response,"Password contains invalid characters");
            return false;
        }
    }  
}

function validateNumberRange(value, response, valueName, minInclusive, maxExclusive) {
    if(validateRequestField(value, "number", response, valueName)){
        if(value >= minInclusive){
            if(value < maxExclusive){
                return true;
            } else {
                sendErrorResponse(response, valueName+" must be < "+max);
            }
        } else {
            sendErrorResponse(response, valueName+" must be >= "+min);
        }
    }

    return false;
}

function validateHTMLDate(value, response){
    if(validateRequestField(value, "string", response, "date")){
        if(value.length === 10 && value[4] === "-" && value[7] === "-"){
            let valMod = value.replaceAll("-","");
            if(REGEX_CHECK_ONLY_DIGITS.test(valMod)) {
                return true;
            }
        } else {
            sendErrorResponse(response, "date formatted poorly");
        }
    }

    return false;
}

function validateStatementName(value, response){
    if(validateRequestField(value, "string", response, "name")){
        if(value.length <= 25 && value.length >= 1){
            return true;
        } else {
            sendErrorResponse(response, "name is of invalid length");
        }
    }

    return false;
}

function validateStatementAmount(value, response){
    if(validateRequestField(value, "number", response, "amount")){
        if(value > 0 && value <= 1000000000) {
            return true;
        } else {
            sendErrorResponse(response, "amount must be aabove 0 no more than 1 billion");
        }
    }
    return false;
}

function validateStatementType(value, response){
    if(validateRequestField(value, "string", response, "type")){
        if(value === "expense" || value === "income"){
            return true;
        } else {
            sendErrorResponse(response, "value is of invalid type");
        }
    }
    return false;
}

module.exports.sendErrorResponse = sendErrorResponse;
module.exports.validateRequestField = validateRequestField;
module.exports.validateUsername = validateUsername;
module.exports.validatePassword = validatePassword;
module.exports.validateNumberRange = validateNumberRange;
module.exports.validateHTMLDate = validateHTMLDate;
module.exports.validateStatementAmount = validateStatementAmount;
module.exports.validateStatementName = validateStatementName;
module.exports.validateStatementType = validateStatementType;