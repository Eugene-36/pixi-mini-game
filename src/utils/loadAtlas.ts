import { Assets } from '@pixi/assets';
import { Texture } from '@pixi/core';
import { Spritesheet } from '@pixi/spritesheet';

/**
 * Загружает TexturePacker JSON+PNG атлас
 */
export async function loadAtlas(
  basePath: string
): Promise<Record<string, Texture>> {
  const jsonUrl = `${basePath}.json`;
  const pngUrl = `${basePath}.png`;

  const atlasData = await (await fetch(jsonUrl)).json();
  const imageTexture = await Assets.load<Texture>(pngUrl);

  const spritesheet = new Spritesheet(imageTexture.baseTexture, atlasData);

  await spritesheet.parse();

  return spritesheet.textures;
}
