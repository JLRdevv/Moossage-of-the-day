"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = motdFetcher;
const node_cron_1 = __importDefault(require("node-cron"));
const MOTD_1 = __importDefault(require("../models/MOTD"));
const dayjs = require("dayjs");
const axios_1 = __importDefault(require("axios"));
async function fetchData(date) {
    const url = "https://zenquotes.io/api/today";
    const response = await axios_1.default.get(url);
    if (response.data.length == 0) {
        throw new Error('error while fetching data from API');
    }
    const resObject = {
        message: response.data[0].q,
        author: response.data[0].a,
        date,
    };
    return resObject;
}
async function motdFetcher() {
    console.log('fetching message...');
    const today = dayjs().format("YYYY-MM-DD");
    try {
        const response = await MOTD_1.default.findOne({ date: today }).lean();
        if (!response) {
            const data = await fetchData(today);
            const motd = new MOTD_1.default(data);
            await motd.save();
        }
    }
    catch (error) {
        const errorObj = {
            message: "there was an error while saving today's moosage",
            author: "sorry",
            date: today,
        };
        const motd = new MOTD_1.default(errorObj);
        motd.save();
    }
}
// get new Quote every day at midnight
node_cron_1.default.schedule("0 0 * * *", motdFetcher);
