import { Application } from '@pixi/app';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { BaseScene } from '../scenes/BaseScene';
import { SoundManager } from '../managers/SoundManager';
import { extensions } from '@pixi/extensions';
import { EventSystem } from '@pixi/events';
import { ProgressManager } from '../managers/ProgressManager';
import { LevelManager } from '../managers/LevelManager';
export class Game {
  public static app: Application;
  public static currentScene: BaseScene;
  public static instance: Game;

  constructor() {
    extensions.add(EventSystem);
    Game.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x000000,
    });
    Game.instance = this;
    document.body.appendChild(Game.app.view as unknown as HTMLCanvasElement);
    this.start();
    Game.app.ticker.add((delta) => {
      const scene = Game.currentScene;
      if (scene && typeof (scene as any).updateScene === 'function') {
        (scene as any).updateScene(delta);
      }
    });
    SoundManager.init();
  }

  start() {
    const saved = ProgressManager.load();
    if (saved) {
      LevelManager.setCurrentLevel(saved.level);
      SoundManager.setMuted(saved.muted);
    }
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
