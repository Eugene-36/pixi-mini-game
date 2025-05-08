import { Text } from 'pixi.js';
import { BaseScene } from '../scenes/BaseScene';
import { Game } from '../core/Game';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { LevelManager } from '../managers/LevelManager';
import { createBasicButton } from '../utils/createBasicButton';
import { createOrUpdateText } from '../utils/uiHelpers';

export class FinalWinScene extends BaseScene {
  constructor() {
    super();
    const winText = this.completeGameText();
    const backButton = this.createBackButton();

    this.addChild(backButton, winText);
  }
  private createBackButton(): Text {
    return createBasicButton(
      '↩️ Back to Menu',
      400,
      350,
      () => {
        LevelManager.reset();
        Game.instance.changeScene(new MainMenuScene());
      },
      { fontSize: 24, fill: '#ffffff' }
    );
  }
  private completeGameText(): Text {
    return createOrUpdateText(
      this,
      null,
      '🎉 You Completed All Levels!',
      400,
      250,
      { fontSize: 36, fill: '#00ff00' },
      { x: 0.5, y: 0.5 }
    );
  }
}
