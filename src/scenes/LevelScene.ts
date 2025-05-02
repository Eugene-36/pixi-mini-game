import { Container, Text } from 'pixi.js';

export class LevelScene extends Container {
  constructor() {
    super();
    const text = new Text({
      text: 'Level 1',
      style: {
        fill: 0xffffff,
        fontSize: 24,
      },
    });
    text.x = 20;
    text.y = 20;
    this.addChild(text);
  }
}
