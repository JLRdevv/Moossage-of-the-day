import express from "express";
import motdController from "../controllers/motdController";

const routermotd = express.Router()

routermotd.get('/motd', motdController.getMotd)

export default routermotd