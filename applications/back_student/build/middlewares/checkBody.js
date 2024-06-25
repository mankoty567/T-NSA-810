"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmpty = function (req, res, next) {
    if (req.body === undefined ||
        req.body.username === undefined ||
        req.body.password === undefined) {
        return res.status(400).send();
    }
    // if string value is longer than 0, continue with next function in route
    next();
};
