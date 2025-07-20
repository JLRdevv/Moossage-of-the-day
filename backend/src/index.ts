// Libs
import express from "express";
import db from "./database/database";
import cors from "cors";

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

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

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

const port = 5000;
db.sync().then(() => {
  app.listen(port, "0.0.0.0", () => {
    console.log(`App running on port ${port}`);
  });
});
