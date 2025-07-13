"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database/database"));
require("./models/MOTD");
require("./services/dailyQuoteColector");
const motdRouter_1 = __importDefault(require("./routes/motdRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json());
app.use('/get', motdRouter_1.default);
app.get("/", (req, res) => {
    res.send("hello world");
});
database_1.default.sync().then(() => {
    app.listen(3000);
    console.log("app running...");
});
