const {PORT, JWT_KEY} = require("./config");
const express = require("express");
const multer = require("multer");
const {userAuthMiddlW} = require("./middleware/user");
const {User} = require("./database/schema");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const {signUpSchema, signInSchema} = require("./zodSchema");
const bcrypt = require("bcrypt");


module.exports = {
    PORT, JWT_KEY, express, multer, userAuthMiddlW, User, jwt, cors, signUpSchema, signInSchema, bcrypt
}