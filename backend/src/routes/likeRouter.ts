import express from "express";
import likeController from "../controllers/likeController";

const routerlike = express.Router();

routerlike.post("/add", likeController.likeToggle);
routerlike.post("/get", likeController.getLikes);
routerlike.post("/isLiked", likeController.isLiked);
export default routerlike;
