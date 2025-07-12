"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MOTD_1 = __importDefault(require("../models/MOTD"));
const dayjs = require("dayjs");
const axios_1 = __importDefault(require("axios"));
async function teste() {
    const today = dayjs().format('YYYY-MM-DD');
    await MOTD_1.default.findOne({ where: { date: today }, raw: true }).then((response) => {
        console.log(response);
        if (true) {
            const url = "https://zenquotes.io/api/today";
            axios_1.default
                .get(url)
                .then((response) => {
                const data = response.data;
                const motdObject = {
                    message: data[0].q,
                    author: data[0].a,
                    date: today,
                };
                MOTD_1.default.create(motdObject);
            })
                .catch((error) => {
                MOTD_1.default.create({ message: "there was an error while saving today's moosage", author: "sorry", date: today });
            });
        }
    });
}
teste();
