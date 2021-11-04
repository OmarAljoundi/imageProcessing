import sharp from 'sharp';
import fs from 'fs';

class Image {
  static async resizeImage(
    image?: string,
    height?: number,
    width?: number
  ): Promise<string> {
    const filePath = `original/${image}.png`;

    try {
      await sharp(filePath)
        .resize({
          width,
          height
        })
        .toFile(`thumbnail/Omar-${width}-${height}_thumbnail.png`);
      return `thumbnail/Omar-${width}-${height}_thumbnail.png`;
    } catch (error) {
      return 'Something Went Wrong';
    }
  }

  static async createFolder(): Promise<void> {
    const folderPath = 'thumbnail';
    await fs.promises.mkdir(folderPath, { recursive: true });
  }
}
export default Image;
