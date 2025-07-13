import MOTD from "../models/MOTD";
import Like from "../models/Like";
import { type Request, type Response } from "express";

interface expectedRequestBody {
  user_uuid: string;
  motdId: number;
}

class likeController {
  static async likeToggle(req: Request, res: Response) {
    const { user_uuid, motdId }: expectedRequestBody = req.body;

    const isMotdValid = await MOTD.findOne({ where: { id: motdId } });

    if (!isMotdValid) {
      return res.status(500).json({
        message: "This moossage does not exist",
        sucess: false,
      });
    }

    const likeExists = await Like.findOne({ where: { user_uuid, motdId } });

    if (!likeExists) {
      const likeObject = {
        user_uuid,
        motdId,
      };

      await Like.create(likeObject)
        .then(() => {
          return res.status(200).json({
            message: "liked",
            sucess: true,
          });
        })
        .catch(() => {
          return res.status(500).json({
            message: "Error while liking",
            sucess: false,
          });
        });
    } else {
      await Like.destroy({ where: { user_uuid, motdId } })
        .then(() => {
          return res.status(200).json({
            message: "unliked",
            sucess: true,
          });
        })
        .catch(() => {
          return res.status(500).json({
            message: "Error while unliking",
            sucess: false,
          });
        });
    }
  }
}

export default likeController;
