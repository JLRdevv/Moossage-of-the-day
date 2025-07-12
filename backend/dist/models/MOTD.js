"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const sequelize_1 = require("sequelize");
const MOTD = database_1.default.define('motd', {
    message: {
        type: sequelize_1.DataTypes.STRING
    },
    author: {
        type: sequelize_1.DataTypes.STRING
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        unique: true
    }
});
exports.default = MOTD;
