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
  (button as any).interactive = true;
  (button as any).cursor = 'pointer';
  (button as any).on('pointerdown', (event: PointerEvent) => onClick);

  return button;
}
