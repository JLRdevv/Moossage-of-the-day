"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("motd", "root", "", {
    host: "localhost",
    dialect: "mysql"
});
db.authenticate();
exports.default = db;
