const passwordValidator = require('password-validator');
const emailValidate = require("email-validator");

// the password validate method
let passValidate = new passwordValidator();
passValidate
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);


module.exports={passValidate,emailValidate};