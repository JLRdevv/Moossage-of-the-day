"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MOTD_1 = __importDefault(require("../models/MOTD"));
const Like_1 = __importDefault(require("../models/Like"));
class likeController {
    static async likeToggle(req, res) {
        const { user_uuid, motdId } = req.body;
        const isMotdValid = await MOTD_1.default.findOne({ where: { id: motdId } });
        if (!isMotdValid) {
            return res.status(500).json({
                message: "This moossage does not exist",
                sucess: false,
            });
        }
        const likeExists = await Like_1.default.findOne({ where: { user_uuid, motdId } });
        if (!likeExists) {
            const likeObject = {
                user_uuid,
                motdId,
            };
            await Like_1.default.create(likeObject)
                .then(() => {
                return res.status(200).json({
                    message: "liked",
                    sucess: true,
                });
            })
                .catch(() => {
                return res.status(500).json({
                    message: "Error while liking",
                    sucess: false,
                });
            });
        }
        else {
            await Like_1.default.destroy({ where: { user_uuid, motdId } })
                .then(() => {
                return res.status(200).json({
                    message: "unliked",
                    sucess: true,
                });
            })
                .catch(() => {
                return res.status(500).json({
                    message: "Error while unliking",
                    sucess: false,
                });
            });
        }
    }
}
exports.default = likeController;
