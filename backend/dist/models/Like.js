"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
const MOTD_1 = __importDefault(require("./MOTD"));
class Like extends sequelize_1.Model {
}
Like.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    user_uuid: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    motdId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: "like",
    tableName: "likes",
});
Like.belongsTo(MOTD_1.default, { foreignKey: "motdId" });
MOTD_1.default.hasMany(Like, { foreignKey: "motdId" });
exports.default = Like;
