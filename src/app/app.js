const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const {NODE_ENV} = require("../../config");

app.use(morgan((NODE_ENV === "production") ? "tiny" : "common"));
app.use(express.static("public"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

const AuthenticationRouter = require("../routes/AuthenticationRouter");
const DealsRouter = require("../routes/DealsRouter");
const EmployeeRouter = require("../routes/EmployeeRouter");

app.use("/api", AuthenticationRouter);
app.use("/api", DealsRouter);
app.use("/api", EmployeeRouter);

//Middleware error handler
app.use(function errorHandler(error, req, res, next) {

    let response;

    if (NODE_ENV === 'production') {
      response = { error: 'Server error' }
    } else {
      
      response = { error: error.message, object: error }
    };

    console.error(error);

    return res.status(500).json(response);
  });


app.get("/", (req, res)=> {
    res.send("Working");
});



module.exports = app;