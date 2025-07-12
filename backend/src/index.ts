import express from "express";
import db from "./database/database";
import "./models/MOTD";
import "./services/dailyQuoteColector"

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

db.sync().then(() => {
  app.listen(3000);
  console.log("app running...");
});
