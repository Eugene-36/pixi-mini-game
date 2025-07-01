import { Texture } from '@pixi/core';
import { AnimatedSprite } from '@pixi/sprite-animated';

import { EnemyManager } from '../managers/EnemyManager';
import { SoundManager } from '../managers/SoundManager';
import { HitEmitter } from '../visualEffects/HitEmitter';

export class Enemy extends AnimatedSprite {
  private speed: number;
  private hitEffect: HitEmitter;
  // Объявляем статические обработчики событий
  static onEnemyDefeated: (enemy: Enemy) => void = () => {};
  static onEnemyEscaped: (enemy: Enemy) => void = () => {};

  constructor(textures: Texture[], hitEffect: HitEmitter) {
    super(textures, true);

    if (!textures || textures.length === 0) {
      throw new Error('Enemy requires at least one texture');
    }

    this.hitEffect = hitEffect;
    this.speed = Math.random() * 2 + 1;
    this.anchor.set(0.5);
    this.position.set(Math.random() * 800, -50);

    this.animationSpeed = 0.15;
    this.loop = true;
    this.play();

    this.setupInteractivity();
  }
  private setupInteractivity() {
    this.interactive = true;
    this.on('pointerdown', this.handleClick);
  }
  private handleClick = () => {
    if (this.destroyed || EnemyManager.isGameOver()) return;

    this.hitEffect.play(this.x, this.y);
    // console.log('Enemy defeated:', this.destroy());
    this.destroy();
    Enemy.onEnemyDefeated(this);
    SoundManager.play('click');
  };
  updateEnemy(delta: number) {
    this.x += Math.sin(this.y * 0.01) * this.speed * delta;
    this.y += this.speed * delta;

    if (this.y > 650) {
      this.y = -50;
      this.x = Math.random() * 800;
    }
  }
  destroy(): void {
    if (this.destroyed) return;
    this?.off('pointerdown', this.handleClick);
    super.destroy();
  }
}
