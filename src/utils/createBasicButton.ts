import { Text, TextStyle } from 'pixi.js';

export function createBasicButton(
  label: string,
  x: number,
  y: number,
  onClick: () => void,
  styleOverrides: Partial<TextStyle> = {}
): Text {
  const button = new Text({
    text: label,
    style: {
      fontSize: 36,
      fill: '#ffffff',
      ...styleOverrides,
    },
  });

  button.anchor.set(0.5);
  button.position.set(x, y);
  button.interactive = true;
  button.cursor = 'pointer';
  button.on('pointerdown', onClick);

  return button;
}
