"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") });
}
const mongoURI = process.env.DB_URI;
async function main() {
    await mongoose_1.default.connect(mongoURI);
}
main().catch((err) => {
    console.log(err);
});
exports.default = mongoose_1.default;
