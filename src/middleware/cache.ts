import NodeCache from "node-cache";
import express, { Request, Response } from "express";
const myCache = new NodeCache({ stdTTL: 5 });

export const checkThumbnail = (
  req: Request,
  res: Response,
  next: () => void
) => {
  try {
    const { filename, width, height } = req.query;
    const cacheFilename = myCache.get("filename");
    const cacheWidth = myCache.get("width");
    const cacheHeight = myCache.get("height");
    if (
      filename == cacheFilename &&
      width == cacheWidth &&
      height == cacheHeight
    ) {
      return res.json({
        status: "Success",
        FileName: `path already created thumbnail/${filename}.png-${width}-${height}_thumbnail`,
      });
    } else {
      const success = myCache.mset([
        { key: "filename", val: filename },
        { key: "width", val: width },
        { key: "height", val: height },
      ]);
      return next();
    }
  } catch (err) {
    throw new Error(err as string);
  }
};
