import { say } from "cowsay";
import { Request, Response } from "express";
class Custom {
  static makeCustom(req: Request, res: Response) {
    let text = "Mooo";
    let tongue = "";
    let eyes = "oO";

    if (req.body) {
      console.log(req.body);
      if (req.body.message) {
        text = req.body.message;
      }
      if (req.body.tongue) {
        tongue = req.body.tongue;
      }
      if (req.body.eyes) {
        eyes = req.body.eyes;
      }
    }

    const responseMessage = say({
      text,
      T: tongue,
      e: eyes,
      W: 30,
    } as any);
    res.status(200).json({
      data: responseMessage,
    });
  }
}

export default Custom;
