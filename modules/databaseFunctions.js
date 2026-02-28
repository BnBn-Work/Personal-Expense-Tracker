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
                sendErrorResponse(response, valueName+" must be < "+max)
            }
        } else {
            sendErrorResponse(response, valueName+" must be >= "+min)
        }
    }

    return false;
}


module.exports.sendErrorResponse = sendErrorResponse;
module.exports.validateRequestField = validateRequestField;
module.exports.validateHexcode = validateHexcode;
module.exports.validateNumberRange = validateNumberRange;