"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_rate_limit_1 = require("express-rate-limit");
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limits to 500 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: "Exceded request limit, try again later.",
});
exports.default = limiter;
