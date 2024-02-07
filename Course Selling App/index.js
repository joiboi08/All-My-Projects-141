const express = require("express");

const app = express();
app.use(express.json());

// defining re-routes
const adminRouter = require("./Routes/adminRoutes");
const userRouter = require("./Routes/userRoutes");

// app.use()

// re-route routes to /Routes/user or /Routes/admin
app.use("/admin/", adminRouter);
app.use("/user", userRouter);

// defining PORT and running server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started and listeining on ${PORT}`);
})


//! NOT exporting anything to avoid creating a circular dependency.
//* Only thing that might've been exported from here is the jwtKey for signing and verifying. Will do that in a seprate config.js file. 