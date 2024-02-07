//! will NOT do zod input validation - that will be done in routes itself 
//* will do authentication checks for admin
//* possible admin, AFTER SIGN UP/SIGN IN, will send their jwt token. This takes that and verifies against database if admin exists in DB or not.

// the admin sends a token in the auth header in the form : "Bearer aeq52132eq23474261"

const jwt = require("jsonwebtoken");
const {jwtKey} = require("../key");  // jwt password to sign, decode and verify

function adminAuthMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    // created an array like : ["Bearer", "t23et114y4"]

    const verified = jwt.verify(token, jwtKey); 

    if (!verified) {
        return res.status(403).json({   //! 403 - forbidden resource
            error : "Admin Authentication failed"
        })
    }

    // if verified is successful, we call next middleware/move on
    next();

}


module.exports = adminAuthMiddleware;