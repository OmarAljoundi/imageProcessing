"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var index_1 = require("./route/index");
exports.app = (0, express_1.default)();
var address = "0.0.0.0:3000";
exports.app.use(body_parser_1.default.json());
exports.app.get("/", function (req, res) {
    return res.send("Hello World!");
});
(0, index_1.image_routing)(exports.app);
exports.app.listen(3000, function () {
    console.log("starting app on: " + address);
});
