import sharp = require('sharp');

type ResizeAndSaveOptions = {
  destination: string;
  fromPath: string;
  fitMode: 'fill' | 'fit';
  expectedWidth: number;
  expectedHeight: number;
};

export class ImageUtils {
  private constructor() {
    throw new Error(`${ImageUtils.name} is private`);
  }

  public static async loadMetadata(imagePath: string): Promise<sharp.Metadata> {
    return sharp(imagePath).metadata();
  }

  public static async resizeAndSaveTo(opts: ResizeAndSaveOptions): Promise<void> {
    const { fromPath, fitMode, expectedWidth, expectedHeight, destination } = opts;
    const sharpItem = sharp(fromPath).resize({
      fit: fitMode === 'fill' ? 'fill' : 'contain',
      width: expectedWidth,
      height: expectedHeight,
    });
    if (destination.toLocaleLowerCase().endsWith('.png')) {
      await sharpItem
        .png({
          quality: 100,
          compressionLevel: 0,
        })
        .toFile(destination);
    } else {
      throw new Error('Extension is not managed');
    }
  }
}
