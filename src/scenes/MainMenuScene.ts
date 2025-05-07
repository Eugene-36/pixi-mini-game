import { Container, Sprite, Assets } from 'pixi.js';
import { Game } from '../core/Game';
import { LevelScene } from './LevelScene';
import { BaseScene } from './BaseScene';
export class MainMenuScene extends BaseScene {
  constructor() {
    super();

    const swordCursor = "url('/assets/sword.png'), auto";
    Game.app.renderer.events.cursorStyles.default = swordCursor;
    Game.app.renderer.events.cursorStyles.hover = swordCursor;

    this.loadAssets();
  }

  async loadAssets() {
    const buttonTexture = await Assets.load('/assets/startGame.png');

    const button = new Sprite(buttonTexture);
    button.anchor.set(0.5);
    button.position.set(Game.app.screen.width / 2, Game.app.screen.height / 2);
    button.scale.set(0.5);
    button.interactive = true;
    button.eventMode = 'static';
    button.cursor = 'pointer';

    button.on('pointerdown', () => {
      Game.instance.changeScene(new LevelScene());
    });

    this.addChild(button);
  }
}
