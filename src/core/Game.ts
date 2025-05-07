import { Application } from 'pixi.js';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { BaseScene } from '../scenes/BaseScene';
import { SoundManager } from '../managers/SoundManager';
export class Game {
  public static app: Application;
  public static currentScene: BaseScene;
  public static instance: Game;

  constructor() {
    Game.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    Game.instance = this;
    Game.app.init().then(() => {
      document.body.appendChild(Game.app.canvas);
      this.start();
      Game.app.ticker.add((ticker) => {
        const delta = ticker.deltaTime;
        const scene = Game.currentScene;
        if (scene && typeof (scene as any).updateScene === 'function') {
          (scene as any).updateScene(delta);
        }
      });
    });
    SoundManager.init();
    SoundManager.playBg();
  }

  start() {
    this.changeScene(new MainMenuScene());
  }

  public changeScene(scene: BaseScene) {
    if (Game.currentScene) {
      Game.currentScene.onDestroy?.();
      Game.app.stage.removeChild(Game.currentScene);
    }
    Game.currentScene = scene;
    scene.init?.();
    Game.app.stage.addChild(scene);
  }
}
