import express from "express";
import db from "./database/database";
import "./models/MOTD";
import "./services/dailyQuoteColector"
import routermotd from "./routes/motdRouter";

const app = express();

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.use('/get', routermotd)

app.get("/", (req, res) => {
  res.send("hello world");
});


db.sync().then(() => {
  app.listen(3000);
  console.log("app running...");
});
