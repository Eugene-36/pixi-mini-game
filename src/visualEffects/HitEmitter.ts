import { Emitter } from '@pixi/particle-emitter';
import { Texture } from '@pixi/core';
import { Container, DisplayObject } from '@pixi/display';
export class HitEmitter {
  private emitter: Emitter;
  constructor(stage: Container, texture: Texture) {
    this.emitter = new Emitter(stage, {
      lifetime: { min: 0.2, max: 0.4 },
      frequency: 0.01,
      pos: { x: 0, y: 0 },
      behaviors: [
        {
          type: 'alpha',
          config: {
            alpha: {
              list: [
                { time: 0, value: 1 },
                { time: 1, value: 0 },
              ],
            },
          },
        },
        {
          type: 'scale',
          config: {
            scale: {
              list: [
                { time: 0, value: 1 },
                { time: 1, value: 0.2 },
              ],
            },
          },
        },
        {
          type: 'color',
          config: {
            color: {
              list: [
                { time: 0, value: '#ffffff' },
                { time: 1, value: '#ff0000' },
              ],
            },
          },
        },
        {
          type: 'rotationStatic',
          config: {
            min: 0,
            max: 360,
          },
        },
        {
          type: 'textureSingle',
          config: {
            texture: texture,
          },
        },
        {
          type: 'moveSpeed',
          config: {
            speed: {
              list: [
                { time: 0, value: 150 },
                { time: 1, value: 50 },
              ],
            },
          },
        },
      ],
    });
    this.emitter.emit = false;
  }
  play(x: number, y: number) {
    this.emitter.updateOwnerPos(x, y);
    this.emitter.emit = true;

    setTimeout(() => {
      this.emitter.emit = false;
    }, 300);
  }

  update(delta: number) {
    this.emitter.update(delta * 0.016);
  }
  destroy() {
    this.emitter.destroy();
  }
}
