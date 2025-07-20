"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MOTD_1 = __importDefault(require("../models/MOTD"));
const cowsay_1 = require("cowsay");
const dailyQuoteColector_1 = __importDefault(require("../services/dailyQuoteColector"));
const dayjs_1 = __importDefault(require("dayjs"));
class motdController {
    static async getMotd(req, res) {
        const today = (0, dayjs_1.default)().format("YYYY-MM-DD");
        const weekDay = (0, dayjs_1.default)().format("dddd");
        let getMotd = await MOTD_1.default.findOne({
            where: { date: today },
            order: [["id", "DESC"]],
            raw: true,
        });
        if (!getMotd) {
            // Fetch new MOTD and retry
            await (0, dailyQuoteColector_1.default)();
            getMotd = await MOTD_1.default.findOne({
                where: { date: today },
                order: [["id", "DESC"]],
                raw: true,
            });
        }
        let eyes = "oO";
        let tongue = "";
        if (req.body) {
            if (req.body.dead) {
                if (req.body.dead == true) {
                    eyes = "XX";
                    tongue = "U";
                }
            }
        }
        if (getMotd) {
            const responseMessage = (0, cowsay_1.say)({
                text: `"${getMotd.message}"\n -${getMotd.author}`,
                e: eyes,
                T: tongue,
                W: 45,
            });
            return res.status(200).json({
                data: responseMessage,
                success: true,
                date: getMotd.date,
                weekDay,
                motdId: getMotd.id,
            });
        }
        return res.status(500).json({
            data: "Internal error",
            success: false,
        });
    }
}
exports.default = motdController;
