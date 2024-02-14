// db schema for user database in mongo
const mongo = require("mongoose");
const {MONGO_URL} = require("../config");

mongo.connect(MONGO_URL);

//* the idea here is to use multer to convert uploaded image into binary data (Buffer) and store it
const userSchema = {
    name : String,
    username : String,
    password : String,   //! password is hashed before storage
    images : [{
        type : Buffer  // image stored in binary
    }]
}

const User = mongo.model("Users", userSchema);

module.exports = {
    User
}
