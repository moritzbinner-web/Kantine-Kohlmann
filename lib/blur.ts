import { getPlaiceholder } from 'plaiceholder';
import fs from 'fs/promises';
import path from 'path';

const FALLBACK_BLUR =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

export async function getBlurDataURL(publicImagePath: string): Promise<string> {
  try {
    const absolutePath = path.join(process.cwd(), 'public', publicImagePath);
    const buffer = await fs.readFile(absolutePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch {
    return FALLBACK_BLUR;
  }
}
