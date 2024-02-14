// authentication middleware for user
// applies to : only "/uploadImage" endpoint 
// expects jwt token string in headers.authorization
// verifies it with JWT_KEY 
// next() if all good, returns 401 (bad token) error
const {JWT_KEY} = require("../config");
const jwt = require("jsonwebtoken");

function userAuthMiddlW(req, res, next) {
    function userAuthMiddlW(req, res, next) {
        const token = req.headers.authorization.split(" ")[1];
        // expects auth header to be of the form : {"Bearer ey13841j89utj24g9824"}
        const verified = jwt.verify(token, JWT_KEY);
        
        if(!verified) {
            // 401 and error 
            return res.status(401).json({
                error : "Invalid token"
            })
        }

        next();
    
    }
}

module.exports = {
    userAuthMiddlW
}