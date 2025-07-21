import MOTD from "../models/MOTD";
import Like from "../models/Like";
import { type Request, type Response } from "express";
import { ObjectId } from "mongoose";
import mongoose from 'mongoose'

interface expectedRequestBody {
  user_uuid: string;
  motdId: number;
}

export interface Like {
  user_uuid: string;
  motdId: string;
  _id: ObjectId;
}

class likeController {
  static async likeToggle(req: Request, res: Response) {
    const { user_uuid, motdId }: expectedRequestBody = req.body;

    const isMotdValid = await MOTD.findById(motdId);

    if (!isMotdValid) {
      return res.status(500).json({
        message: "This moossage does not exist",
        sucess: false,
      });
    }

    const likeExists = await Like.findOne({ user_uuid, motdId });

    if (!likeExists) {
      const likeObject = {
        user_uuid,
        motdId,
      };
      const like = new Like(likeObject);
      await like
        .save()
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
      await Like.deleteOne({ user_uuid, motdId })
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
      const motdExists = await MOTD.findById(req.body.motdId);
      if (!motdExists) {
        return res.status(404).json({
          message: "Moossage of the day not found",
          success: false,
        });
      }
      const likes = await Like.countDocuments({ motdId: req.body.motdId });
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

  static async isLiked(req: Request, res: Response) {
    if (req.body && req.body.motdId && req.body.user_uuid) {
      const motdExists = await MOTD.findById(req.body.motdId);
      if (!motdExists) {
        return res.status(500).json({
          message: "Invalid motd id",
        });
      }

      const likeFetch = await Like.findOne({
        motdId: req.body.motdId,
        user_uuid: req.body.user_uuid,
      });
      let isLiked = false;
      if (likeFetch) {
        isLiked = true;
      }
      return res.status(200).json({
        liked: isLiked,
        sucess: true,
      });
    }
    return res.status(500).json({
      message: "Invalid Request Body",
    });
  }
}

export default likeController;
