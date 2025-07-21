"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const motdController_1 = __importDefault(require("../controllers/motdController"));
const routermotd = express_1.default.Router();
routermotd.get('/motd', motdController_1.default.getMotd);
exports.default = routermotd;
