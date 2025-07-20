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

  static async getLikes(req: Request, res: Response) {
    if (req.body && req.body.motdId) {
      const motdExists = await MOTD.findOne({ where: { id: req.body.motdId } });
      if (!motdExists) {
        return res.status(404).json({
          message: "Moossage of the day not found",
          success: false,
        });
      }
      const likes = await Like.count({
        where: { motdId: req.body.motdId },
      });
      return res.status(200).json({
        message: "Likes retrieved successfully",
        likes,
        success: true,
      });
    }
    return res.status(400).json({
      message: "Invalid request body",
      success: false,
    });
  }
}

export default likeController;
