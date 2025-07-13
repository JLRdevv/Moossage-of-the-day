// Libs
import express from "express";
import db from "./database/database";

// Models
import "./models/MOTD";
import "./models/Like";

// Routers
import routermotd from "./routes/motdRouter";
import routerlike from "./routes/likeRouter";

// Services
import "./services/dailyQuoteColector";
import limiter from "./config/rateLimiter";

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(limiter);

app.use("/get", routermotd);

app.use("/like", routerlike);

db.sync().then(() => {
  app.listen(3000);
  console.log("app running...");
});
