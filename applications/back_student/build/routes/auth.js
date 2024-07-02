"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("../controller/AuthController"));
var checkBody_1 = require("../middlewares/checkBody");
var checkJwt_1 = require("../middlewares/checkJwt");
var router = express_1.Router();
// Login route
router.post('/login', [checkBody_1.validateEmpty], AuthController_1.default.login);
router.post('/register', [checkBody_1.validateEmpty], AuthController_1.default.register);
router.get('/me', [checkJwt_1.checkJwt], AuthController_1.default.getMe);
router.post('/change-password', [checkJwt_1.checkJwt], AuthController_1.default.changePassword);
exports.default = router;
