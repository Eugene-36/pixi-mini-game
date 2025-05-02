import { Container, Text } from 'pixi.js';
import { Game } from '../core/Game';
import { LevelScene } from './LevelScene';

export class MainMenuScene extends Container {
  constructor() {
    super();

    const startButton = new Text({
      text: 'Start Game',
      style: {
        fontSize: 36,
        fill: 0xffffff,
      },
    });
    startButton.anchor.set(0.5);
    startButton.x = Game.app.screen.width / 2;
    startButton.y = Game.app.screen.height / 2;
    startButton.interactive = true;
    // startButton.buttonMode = true;
    startButton.eventMode = 'static';
    startButton.cursor = 'pointer';
    startButton.on('pointerdown', () => {
      Game.app.stage.removeChildren();
      Game.app.stage.addChild(new LevelScene());
    });
    this.addChild(startButton);
  }
}
