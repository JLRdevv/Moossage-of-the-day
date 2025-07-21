"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cowsay_1 = require("cowsay");
class Custom {
    static makeCustom(req, res) {
        let text = "Mooo";
        let tongue = "";
        let eyes = "oO";
        if (req.body) {
            if (req.body.text) {
                text = req.body.text;
            }
            if (req.body.tongue) {
                tongue = req.body.tongue;
            }
            if (req.body.eyes) {
                eyes = req.body.eyes;
            }
        }
        const responseMessage = (0, cowsay_1.say)({
            text,
            T: tongue,
            e: eyes,
        });
        res.status(200).json({
            data: responseMessage,
        });
    }
}
exports.default = Custom;
