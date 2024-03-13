const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");


//Connect to dotenv
dotenv.config();

//Establish connection to MongoDB server
mongoose.connect(process.env.MONGO_URL).then(
    ()=> {console.log("A connection to MongoDB was established!");},
    err => {console.log(err);}
);

//Helper middleware packages
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

//Routes
app.use("/api/users", userRoute.routes);
app.use("/api/auth", authRoute.routes);

//Entry point
app.listen(8800, () => {
    console.log("server is up!");
});