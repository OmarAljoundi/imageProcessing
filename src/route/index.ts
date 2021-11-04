import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Image from './utilities';
import checkThumbnail from '../middleware/cache';

const imageRequest = async (_req: Request, res: Response) => {
  const imageName = String(_req.query.filename);
  const height = Number(_req.query.height);
  const width = Number(_req.query.width);
  if (Number.isNaN(width) || Number.isNaN(height) || width < 0 || height < 0) {
    return res.json({
      status: 'Faild',
      FileName: 'Please Enter A valid number for width and height'
    });
  }
  await Image.createFolder();
  const filePath = `original/${imageName}.png`;
  fs.exists(filePath, async (exists) => {
    if (exists) {
      const hasResized = await Image.resizeImage(imageName, height, width);
      if (hasResized === 'No File') {
        return res.json({
          status: 'Faild',
          FileName: 'Your Image Couldnt Process'
        });
      }
      return res.sendFile(path.join(__dirname, '../../', hasResized));
    }
    return res.json({
      status: 'Not Found',
      FileName: 'Image Couldnot Be Found'
    });
  });
  return undefined;
};

const imageRouting = (app: express.Application) => {
  app.get('/api/resizeImage', checkThumbnail, imageRequest);
};
export default imageRouting;
