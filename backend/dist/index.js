"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./database/database"));
const cors_1 = __importDefault(require("cors"));
// Models
require("./models/MOTD");
require("./models/Like");
// Routers
const motdRouter_1 = __importDefault(require("./routes/motdRouter"));
const likeRouter_1 = __importDefault(require("./routes/likeRouter"));
const customRouter_1 = __importDefault(require("./routes/customRouter"));
// Services
require("./services/dailyQuoteColector");
const rateLimiter_1 = __importDefault(require("./config/rateLimiter"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:5173" }));
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(rateLimiter_1.default);
app.use("/get", motdRouter_1.default);
app.use("/like", likeRouter_1.default);
app.use("/custom", customRouter_1.default);
const port = 5000;
database_1.default.sync().then(() => {
    app.listen(port, "0.0.0.0", () => {
        console.log(`App running on port ${port}`);
    });
});
