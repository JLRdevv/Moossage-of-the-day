"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Libs
const express_1 = __importDefault(require("express"));
require("./database/database");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Models
require("./models/MOTD");
require("./models/Like");
// Routers
const motdRouter_1 = __importDefault(require("./routes/motdRouter"));
const likeRouter_1 = __importDefault(require("./routes/likeRouter"));
// import routercustom from "./routes/customRouter";
// Services
require("./services/dailyQuoteColector");
const rateLimiter_1 = __importDefault(require("./config/rateLimiter"));
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
}
const IP_ADRESS_CORS = process.env.IP_ADRESS;
const allowedOrigins = process.env.IP_ADRESS.split(",");
console.log(IP_ADRESS_CORS);
app.use((0, cors_1.default)({
    credentials: true,
    origin: allowedOrigins,
}));
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use(rateLimiter_1.default);
app.use("/get", motdRouter_1.default);
app.use("/like", likeRouter_1.default);
// app.use("/custom", routercustom);
const PORT = parseInt(process.env.PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`App running on port ${PORT}`);
});
