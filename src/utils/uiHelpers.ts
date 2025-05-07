import { Container, Text, TextStyle } from 'pixi.js';

export function createOrUpdateText(
  container: Container,
  ref: Text | null,
  content: string,
  x: number,
  y: number,
  style: Partial<TextStyle> = {},
  anchor?: { x: number; y: number }
): Text {
  if (ref) {
    container.removeChild(ref);
    ref.destroy();
  }

  const text = new Text({
    text: content,
    style: { fontSize: 24, fill: '#ffffff', ...style },
  });
  if (anchor) {
    text.anchor.set(anchor.x, anchor.y);
  }
  text.position.set(x, y);
  container.addChild(text);
  return text;
}
