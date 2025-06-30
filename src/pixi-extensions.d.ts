// pixi-extensions.d.ts
import type { FederatedEventTarget } from '@pixi/events';

declare module '@pixi/sprite' {
  interface Sprite extends FederatedEventTarget {}
}
