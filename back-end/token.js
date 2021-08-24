const jwt = require('jsonwebtoken');

// createToken Function
const createToken = (id, email) => {
    return jwt.sign(
        { id: id, email: email },
        "jsfashlaekhe",
        {
            expiresIn: "1d"
        }
    );

}

module.exports = { createToken };