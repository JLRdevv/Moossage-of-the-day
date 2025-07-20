"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CustomController_1 = __importDefault(require("../controllers/CustomController"));
const routermotd = express_1.default.Router();
routermotd.post("/make", CustomController_1.default.makeCustom);
exports.default = routermotd;
