// =======
import { Sprite } from '@pixi/sprite';
import { Assets } from '@pixi/assets';
import { Rectangle } from '@pixi/math';

// =======
import { Game } from '../core/Game';
import { LevelScene } from './LevelScene';
import { BaseScene } from './BaseScene';
import { SoundManager } from '../managers/SoundManager';

export class MainMenuScene extends BaseScene {
  constructor() {
    super();

    const swordCursor = "url('/assets/sword.png'), auto";
    const canvas = Game.app.view as HTMLCanvasElement;
    if (canvas && canvas.style) {
      canvas.style.cursor = swordCursor;
    }

    this.loadAssets();
  }

  async loadAssets() {
    const buttonTexture = await Assets.load('/assets/startGame.png');

    const button = new Sprite(buttonTexture);
    // const button = new Sprite(buttonTexture) as Sprite & InteractiveTarget;
    button.anchor.set(0.5);
    button.position.set(Game.app.screen.width / 2, Game.app.screen.height / 2);
    button.scale.set(0.5);
    button.interactive = true;
    button.eventMode = 'static';
    button.cursor = 'pointer';

    //Клик только по картинке
    const width = buttonTexture.width * button.scale.x;
    const height = buttonTexture.height * button.scale.y;
    (button as any).hitArea = new Rectangle(
      -width / 2,
      -height / 2,
      width,
      height
    );

    button.on('pointerdown', () => {
      console.log('Button clicked!');

      SoundManager.playBg();
      Game.instance.changeScene(new LevelScene());
    });
    this.addChild(button);
  }
}
