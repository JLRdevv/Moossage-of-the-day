"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database/database"));
const { Schema } = database_1.default;
const Like = database_1.default.model('Like', new Schema({
    user_uuid: {
        type: String,
        required: true
    },
    motdId: {
        type: String,
        required: true
    },
}));
exports.default = Like;
