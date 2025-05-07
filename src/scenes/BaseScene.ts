import { Container } from 'pixi.js';

export class BaseScene extends Container {
  init?(): void;
  updateScene?(delta: number): void;
  onDestroy?(): void;
}
