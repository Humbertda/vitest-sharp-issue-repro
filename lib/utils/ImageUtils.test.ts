import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';

import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { ImageUtils } from '@lib/utils/ImageUtils';

describe('ImageUtils', () => {
  let tempDir: string;
  const rootAeTemplates = path.join(process.cwd(), '/fixtures/templates/');

  beforeAll(async () => {
    tempDir = path.join(os.tmpdir(), `/sdb-vitest-sharp/tests/${crypto.randomUUID()}/image-utils/`);
    fs.mkdirSync(tempDir, {
      recursive: true,
    });
  });

  it('ImageUtils resizeAndSaveToPng', async () => {
    const imageInPath = '/_assets/picto/picto_maison.png';
    const mediaSourcePath = path.join(rootAeTemplates, imageInPath);
    const originMedia = path.join(tempDir, imageInPath);

    // copy image source to temp dir /_assets...
    fs.cpSync(mediaSourcePath, originMedia);

    const resizeDest = path.join(tempDir, './result_1.png');
    await ImageUtils.resizeAndSaveTo({
      fromPath: originMedia,
      destination: resizeDest,
      fitMode: 'fit',
      expectedWidth: 100,
      expectedHeight: 200,
    });
    const imageData = await ImageUtils.loadMetadata(resizeDest);
    expect(imageData.width).toBe(100);
    expect(imageData.height).toBe(200);
    expect(imageData.format).toStrictEqual('png');
  }, 500000);

  afterAll(async () => {
    fs.rmSync(tempDir, {
      recursive: true,
      force: true,
      maxRetries: 2,
    });
  });
});
