import { Ticker } from '@pixi/ticker';
import { Game } from './core/Game';
import { LevelManager } from './managers/LevelManager';

(async () => {
  await LevelManager.loadLevels();
  new Game();
  Ticker.shared.autoStart = true;
  Ticker.shared.start();
})();
