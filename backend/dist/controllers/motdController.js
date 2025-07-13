"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MOTD_1 = __importDefault(require("../models/MOTD"));
const cowsay_1 = require("cowsay");
class motdController {
    static async getMotd(req, res) {
        const getMotd = await MOTD_1.default.findOne({ order: [['id', 'DESC']], raw: true });
        let eyes = "oO";
        let tongue = "";
        if (req.body.dead == true) {
            eyes = "XX";
            tongue = "U";
        }
        if (getMotd) {
            const responseMessage = (0, cowsay_1.say)({
                text: `"${getMotd.message}"\n -${getMotd.author}`,
                e: eyes,
                T: tongue
            });
            console.log(responseMessage);
            return res.status(200).json({
                data: responseMessage,
                success: true,
            });
        }
        return res.status(500).json({
            data: "Internal error",
            success: false,
        });
    }
}
exports.default = motdController;
