import MOTD from "../models/MOTD";
import { say } from "cowsay";
import { response, type Request, type Response } from "express";
import motdFetcher from "../services/dailyQuoteColector";
import dayjs from "dayjs";

class motdController {
  static async getMotd(req: Request, res: Response): Promise<Response> {
    const today = dayjs().format("YYYY-MM-DD");
    const weekDay = dayjs().format("dddd");

    let getMotd = await MOTD.findOne({
      where: { date: today },
      order: [["id", "DESC"]],
      raw: true,
    });

    if (!getMotd) {
      // Fetch new MOTD and retry
      await motdFetcher();
      getMotd = await MOTD.findOne({
        where: { date: today },
        order: [["id", "DESC"]],
        raw: true,
      });
    }

    let eyes = "oO";
    let tongue = "";
    if (req.body) {
      if (req.body.dead) {
        if (req.body.dead == true) {
          eyes = "XX";
          tongue = "U";
        }
      }
    }

    if (getMotd) {
      const responseMessage = say({
        text: `"${getMotd.message}"\n -${getMotd.author}`,
        e: eyes,
        T: tongue,
      });
      return res.status(200).json({
        data: responseMessage,
        success: true,
        date: getMotd.date,
        weekDay,
      });
    }
    return res.status(500).json({
      data: "Internal error",
      success: false,
    });
  }
}

export default motdController;
