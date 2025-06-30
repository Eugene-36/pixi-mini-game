import { Container } from '@pixi/display';
export class BaseScene extends Container {
  init?(): void;
  updateScene?(delta: number): void;
  onDestroy?(): void;
}
