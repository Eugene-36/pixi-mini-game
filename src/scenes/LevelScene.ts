import { Graphics, Sprite, Text, Assets, Texture } from 'pixi.js';
import { Game } from '../core/Game';
import { BaseScene } from './BaseScene';
import { WinScreen } from '../ui/WinScreen';
import { EnemyManager } from '../managers/EnemyManager';
import { SoundManager } from '../managers/SoundManager';
import { Enemy } from '../entities/Enemy';
import { LevelManager } from '../managers/LevelManager';
import { getStars } from '../utils/starRating';
import { FinalWinScene } from '../ui/FinalWinScene';
import { createOrUpdateText } from '../utils/uiHelpers';

export class LevelScene extends BaseScene {
  private enemyTextures: Texture[] = [];
  private winScreen: WinScreen;
  private levelText: Text;
  private timeText: Text;
  private totalEnemies: number;
  private enemiesDefeated = 0;
  private levelTimeLeft = 0;
  private elapsedTime = 0;
  private levelEnded: boolean = false;
  private killCounterText: Text;
  private isPaused = false;
  //Booster
  private boosterUsed = false;
  private boosterButton: Text;
  //Transition
  private transitionOverlay: Graphics;
  //Текущий уровень перед началом сцены
  private levelPopupText?: Text;
  private muteBtn!: Text;

  constructor() {
    super();

    this.transitionOverlay = new Graphics()
      .rect(0, 0, 800, 600)
      .fill({ color: 0x000000, alpha: 1 });
    this.transitionOverlay.alpha = 0;
    this.addChild(this.transitionOverlay);

    this.winScreen = new WinScreen(
      () => this.nextLevel(),
      () => this.restart()
    );
    this.addChild(this.winScreen);
  }

  init() {
    this.loadAssets();
  }

  async loadAssets() {
    try {
      const [atlas, backgroundTexture] = await Promise.all([
        Assets.load('/assets/enemies/dr1.json'),
        Assets.load('/assets/dragon-bg.png'),
      ]);

      const bgSprite = new Sprite(backgroundTexture);
      bgSprite.width = Game.app.screen.width;
      bgSprite.height = Game.app.screen.height;
      this.addChildAt(bgSprite, 0);

      const textures: Texture[] = Object.keys(atlas.textures)
        .sort((a, b) => {
          const aNum = parseInt(a.match(/\d+/)?.[0] || '0', 10);
          const bNum = parseInt(b.match(/\d+/)?.[0] || '0', 10);
          return aNum - bNum;
        })
        .map((frameName) => atlas.textures[frameName]);

      this.enemyTextures = textures;
      this.startLevel();
    } catch (error) {
      console.error('Failed to load assets:', error);
    }
  }
  private runTransition(callback: () => void) {
    // Затухание
    this.transitionOverlay.alpha = 0;
    const fadeOut = () => {
      if (this.transitionOverlay.alpha < 1) {
        this.transitionOverlay.alpha += 0.05;
        requestAnimationFrame(fadeOut);
      } else {
        callback();
        fadeIn();
      }
    };

    const fadeIn = () => {
      if (this.transitionOverlay.alpha > 0) {
        this.transitionOverlay.alpha -= 0.05;
        requestAnimationFrame(fadeIn);
      }
    };

    fadeOut();
  }
  private showLevelPopup(level: number) {
    if (this.levelPopupText) {
      this.removeChild(this.levelPopupText);
      this.levelPopupText.destroy();
    }

    this.levelPopupText = new Text({
      text: `Level ${level}`,
      style: {
        fontSize: 60,
        fill: '#ffffff',
        fontWeight: 'bold',
      },
    });
    this.levelPopupText.anchor.set(0.5);
    this.levelPopupText.position.set(400, 300);
    this.addChild(this.levelPopupText);

    setTimeout(() => {
      if (this.levelPopupText) {
        this.removeChild(this.levelPopupText);
        this.levelPopupText.destroy();
        this.levelPopupText = undefined;
      }
    }, 1000);
  }
  private soundMute() {
    if (!this.muteBtn) {
      this.muteBtn = new Text({
        text: SoundManager.isMuted ? '🔇' : '🔊',
        style: { fontSize: 30, fill: '#ffffff' },
      });
      this.muteBtn.position.set(740, 10);
      this.muteBtn.interactive = true;
      this.muteBtn.on('pointerdown', () => {
        SoundManager.toggleMute();
        this.updateMuteIcon();
      });
      this.addChild(this.muteBtn);
    } else {
      this.updateMuteIcon();
    }
  }
  private updateMuteIcon() {
    this.muteBtn.text = SoundManager.isMuted ? '🔇' : '🔊';
  }
  startLevel() {
    EnemyManager.setGameOver(false);
    this.enemiesDefeated = 0;
    this.elapsedTime = 0;
    this.levelEnded = false;
    this.boosterUsed = false;

    const config = LevelManager.getCurrentLevel();
    this.totalEnemies = config.enemies;
    this.levelTimeLeft = config.time;

    this.timeText = createOrUpdateText(
      this,
      this.timeText,
      `Time: ${this.levelTimeLeft}`,
      10,
      40
    );
    this.levelText = createOrUpdateText(
      this,
      this.levelText,
      `Level ${config.id}`,
      10,
      10
    );
    this.killCounterText = createOrUpdateText(
      this,
      this.killCounterText,
      `Killed: 0 / ${this.totalEnemies}`,
      10,
      70
    );

    this.createPauseButton();
    this.createBoosterButton();
    this.soundMute();

    EnemyManager.init(this, this.enemyTextures, config.enemies);
    this.showLevelPopup(config.id);
    Enemy.onEnemyDefeated = () => this.handleEnemyDefeated();
  }

  private createPauseButton(): void {
    const pauseButton = new Text({
      text: '⏸️',
      style: { fontSize: 30, fill: '#ffffff' },
    });
    pauseButton.position.set(680, 10);
    pauseButton.interactive = true;
    pauseButton.on('pointerdown', () => {
      this.togglePause();
      pauseButton.text = this.isPaused ? '▶️' : '⏸️';
    });
    this.addChild(pauseButton);
  }

  private createBoosterButton(): void {
    this.boosterButton = new Text({
      text: '⏳ - Booster',
      style: { fontSize: 24, fill: '#ffffff' },
    });
    this.boosterButton.position.set(500, 10);
    this.boosterButton.interactive = true;
    this.boosterButton.on('pointerdown', () => this.useBooster());
    this.addChild(this.boosterButton);
  }
  private handleEnemyDefeated() {
    this.enemiesDefeated++;
    this.updateProgressDisplay();

    if (this.enemiesDefeated >= this.totalEnemies) {
      const config = LevelManager.getCurrentLevel();
      const stars = getStars(config.time, this.levelTimeLeft);

      this.winScreen.setMode('win');
      this.winScreen.show('win', stars);

      this.levelEnded = true;
      SoundManager.play('win');
    }
  }

  private useBooster() {
    if (this.boosterUsed || this.levelEnded) return;

    this.levelTimeLeft += 5; // +5 секунд
    this.timeText.text = `Time: ${this.levelTimeLeft}`;
    this.boosterUsed = true;

    // Обновим UI кнопки
    this.boosterButton.text = 'Booster Used';
    this.boosterButton.style.fill = '#888888';
    this.boosterButton.interactive = false;
  }
  private nextLevel() {
    if (LevelManager.isLastLevel()) {
      // Все уровни пройдены — показываем финал
      Game.instance.changeScene(new FinalWinScene());
      SoundManager.playWinGameSound();
    } else {
      this.runTransition(() => {
        this.boosterUsed = false;
        this.boosterButton.text = '';
        this.showLose();
        LevelManager.nextLevel();
        EnemyManager.reset();
        this.startLevel();
      });
    }
  }
  private onLevelFailed() {
    this.winScreen.show('lose');
    EnemyManager.setGameOver(true);
    SoundManager.play('lose');
  }
  private updateProgressDisplay() {
    if (this.killCounterText) {
      this.killCounterText.text = `Killed: ${this.enemiesDefeated} / ${this.totalEnemies}`;
    }
  }

  showLose() {
    this.winScreen.visible = false;
  }
  updateScene(delta: number) {
    if (this.levelEnded || this.isPaused) return;

    EnemyManager.update(delta);

    this.elapsedTime += delta / 60;

    if (this.elapsedTime >= 1) {
      this.elapsedTime = 0;
      this.levelTimeLeft--;
      this.timeText.text = `Time: ${this.levelTimeLeft}`;
      this.timeText.style.fill =
        this.levelTimeLeft <= 5 ? '#ff0000' : '#ffffff';

      if (this.levelTimeLeft <= 0) {
        this.levelEnded = true;
        this.onLevelFailed();
      }
    }
  }
  private togglePause() {
    if (this.levelEnded) return;
    this.isPaused = !this.isPaused;
    this.boosterButton.interactive = !this.isPaused;
    EnemyManager.setEnemiesInteractive(!this.isPaused);
  }

  restart() {
    EnemyManager.reset();
    this.showLose();
    this.boosterUsed = false;
    this.boosterButton.text = '';
    this[this.enemyTextures.length ? 'startLevel' : 'loadAssets']();
  }
}
