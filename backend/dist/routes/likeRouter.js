"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const likeController_1 = __importDefault(require("../controllers/likeController"));
const routerlike = express_1.default.Router();
routerlike.post('/add', likeController_1.default.likeToggle);
exports.default = routerlike;
