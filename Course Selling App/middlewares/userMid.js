//! will NOT do zod input validation - that will be done in routes itself 
//* will do authentication checks for users
//* possible user, AFTER SIGN UP, will send their jwt token. This takes that and verifies against database if user exists in DB or not.

// the user sends a token in the auth header in the form : "Bearer aeq52132eq23474261"

const jwt = require("jsonwebtoken");
const {jwtKey} = require("../key");  // jwt password to sign, decode and verify

function userAuthMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    // created an array like : ["Bearer", "t23et114y4"]

    const verified = jwt.verify(token, jwtKey); 

    if (!verified) {
        return res.status(403).json({      //! 403 - forbidden resource
            error : "User authentication failed"
        })
    }

    // if verified is successful, we call next middleware/move on
    next();

}


module.exports = userAuthMiddleware;