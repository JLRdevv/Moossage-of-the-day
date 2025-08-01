// Libs
import express from "express";
import "./database/database";
import cors from "cors";
import path from "path"
import dotenv from "dotenv"

// Models
import "./models/MOTD";
import "./models/Like";

// Routers
import routermotd from "./routes/motdRouter";
import routerlike from "./routes/likeRouter";
import routercustom from "./routes/customRouter";

// Services
import "./services/dailyQuoteColector";
import limiter from "./config/rateLimiter";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

const IP_ADRESS_CORS = process.env.IP_ADRESS!;

const allowedOrigins = process.env.IP_ADRESS!.split(",");

console.log(IP_ADRESS_CORS)
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(limiter);

app.use("/get", routermotd);

app.use("/like", routerlike);

app.use("/custom", routercustom);

const PORT = parseInt(process.env.PORT!) || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App running on port ${PORT}`);
});
