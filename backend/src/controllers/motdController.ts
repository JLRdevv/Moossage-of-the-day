import MOTD from "../models/MOTD";
import { say } from "cowsay";
import { type Request, type Response } from "express";

class motdController {
  static async getMotd(req: Request, res: Response): Promise<Response> {
    const getMotd = await MOTD.findOne({ order: [['id', 'DESC']], raw: true });

    let eyes = "oO"
    let tongue = ""
    
    if(req.body.dead == true) {
        eyes = "XX"
        tongue = "U"
    }

    if (getMotd) {
      const responseMessage = say({
        text: `"${getMotd.message}"\n -${getMotd.author}`,
        e: eyes,
        T: tongue
      });
      console.log(responseMessage)
      return res.status(200).json({
        data: responseMessage,
        success: true,
      });
    }
    return res.status(500).json({
      data: "Internal error",
      success: false,
    });
  }
}

export default motdController
