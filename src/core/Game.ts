import { Application, Container } from 'pixi.js';
import { MainMenuScene } from '../scenes/MainMenuScene';

export class Game {
  public static app: Application;
  public static currentScene: Container;

  constructor() {
    Game.app = new Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099bb,
    });
    Game.app.init().then(() => {
      document.body.appendChild(Game.app.canvas);
      this.start();
    });
  }

  start() {
    this.changeScene(new MainMenuScene());
  }
  public changeScene(scene: Container) {
    if (Game.currentScene) {
      Game.app.stage.removeChild(Game.currentScene);
    }
    Game.currentScene = scene;
    Game.app.stage.addChild(scene);
  }
}
