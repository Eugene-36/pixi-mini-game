import { Text, TextStyle } from '@pixi/text';
export function createBasicButton(
  label: string,
  x: number,
  y: number,
  onClick: () => void,
  styleOverrides: Partial<TextStyle> = {}
): Text {
  const button = new Text(label, {
    fontSize: 36,
    fill: '#ffffff',
    ...styleOverrides,
  });

  button.anchor.set(0.5);
  button.position.set(x, y);
  button.eventMode = 'static';
  button.cursor = 'pointer';
  button.on('pointerdown', onClick);

  return button;
}
