import { Container, Texture } from 'pixi.js';
import { Enemy } from '../entities/Enemy';
import { LevelManager } from './LevelManager';

export class EnemyManager {
  static container: Container;
  static enemies: Enemy[] = [];
  static enemyTextures: Texture[] = [];

  static totalToSpawn: number = 0;
  static spawnedCount: number = 0;

  static spawnInterval: number = 1000;
  static lastSpawnTime: number = 0;
  static gameOver = false;

  static init(container: Container, textures: Texture[], totalEnemies: number) {
    this.container = container;
    this.enemyTextures = textures;
    this.totalToSpawn = totalEnemies;
    this.spawnedCount = 0;
    this.lastSpawnTime = 0;
    this.enemies = [];
  }
  //  Метод  установки интервала спавна
  static canSpawn(): boolean {
    return (
      this.spawnedCount < this.totalToSpawn &&
      this.enemyTextures.length > 0 &&
      this.enemyTextures.every((t) => t != null)
    );
  }
  static spawnEnemy(): Enemy | null {
    if (!this.canSpawn()) return null;

    const enemy = new Enemy(this.enemyTextures);
    this.container.addChild(enemy);
    this.enemies.push(enemy);
    this.spawnedCount++;

    return enemy;
  }
  static update(delta: number): void {
    const now = Date.now();

    if (!this.gameOver && now - this.lastSpawnTime > this.spawnInterval) {
      this.spawnEnemy();
      this.lastSpawnTime = now;
    }

    this.enemies = this.enemies.filter((e) => !e.destroyed);
    this.enemies.forEach((e) => e.updateEnemy(delta));
  }
  static setEnemiesInteractive(active: boolean) {
    this.enemies.forEach((enemy) => (enemy.interactive = active));
  }

  static reset(): void {
    this.clearEnemies();
    this.spawnedCount = 0;
    this.totalToSpawn = 0;
  }
  static clearEnemies(): void {
    this.enemies.forEach((enemy) => enemy.destroy());
    this.enemies = [];
  }
  static getAliveCount(): number {
    return this.enemies.filter((e) => !e.destroyed).length;
  }

  static setGameOver(value: boolean): void {
    this.gameOver = value;
  }

  static isGameOver(): boolean {
    return this.gameOver;
  }
}
