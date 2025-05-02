import { Application, Graphics } from 'pixi.js';
(async () => {
  const app = new Application();

  await app.init({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.canvas);
  const graphics = new Graphics()
    .rect(0, 0, 100, 100)
    .rect(100, 100, 100, 100)
    .fill({ color: 0xde3249, alpha: 0.5 });

  app.stage.addChild(graphics);
})();
