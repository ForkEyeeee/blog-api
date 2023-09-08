"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
var indexRouter = require("./routes/index");
var app = express();
// view engine setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));
// Compress all routes
app.use(helmet.contentSecurityPolicy({
    directives: {
        "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
}));
const RateLimit = require("express-rate-limit");
const limiter = RateLimit({
    windowMs: 1 * 60 * 1000,
    max: 2000,
});
app.use(limiter);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use("/api", indexRouter);
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// Set up mongoose connection
const mongoDB = process.env.MONGODB_URI || process.env.dev_db_url;
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("../views/error");
});
module.exports = app;
