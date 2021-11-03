import sharp from "sharp";
import express, { Request, response, Response } from "express";
import fs from "fs";
import { checkThumbnail } from "../middleware/cache";
export class Image {
  async resizeImage(
    image?: string,
    height?: number,
    width?: number
  ): Promise<string> {
    let filePath = "original" + "/" + image + ".png";
    try {
      await sharp(filePath)
        .resize({
          width: width,
          height: height,
        })
        .toFile(`thumbnil/${image}-${width}-${height}_thumbnail.png`);
      return `thumbnil/${image}-${width}-${height}_thumbnail.png`;
    } catch (error) {
      return "No File";
    }
  }
}

const image = new Image();
const imageRequest = async (_req: Request, res: Response) => {
  let imageName = String(_req.query.filename);
  let height = Number(_req.query.height);
  let width = Number(_req.query.width);
  let filePath = "original" + "/" + imageName + ".png";
  fs.exists(filePath, async (exists) => {
    if (exists) {
      const hasResized = await image.resizeImage(imageName, height, width);
      if (hasResized == "No File") {
        return res.json({
          status: "Faild",
          FileName: "Your Image Couldn't Process",
        });
      } else {
        return res.json({
          status: "Success",
          FileName: hasResized,
        });
      }
    } else {
      res.json({
        status: "Not Found",
        message: "Image Couldnot Be Found",
      });
    }
  });
};

export const image_routing = (app: express.Application) => {
  app.get("/api/resizeImage", checkThumbnail, imageRequest);
};
