"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var cors_1 = require("cors");
var config_1 = require("./config");
var routes_js_1 = require("./routers/routes.js");
var app = express_1["default"]();
var ROUTER = express_1["default"].Router();
app.use(body_parser_1["default"].urlencoded({ extended: true }));
app.use(body_parser_1["default"].json());
app.use(cors_1["default"]());
app.use(ROUTER);
ROUTER.use("/", routes_js_1.router);
app.listen(config_1["default"].config.port, function () {
    console.log('listening on port ' + config_1["default"].config.port);
});
