"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = __importDefault(require("./auth"));
var user_1 = __importDefault(require("./user"));
var routes = express_1.Router();
routes.use('/auth', auth_1.default);
routes.use('/user', user_1.default);
exports.default = routes;
