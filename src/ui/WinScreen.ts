import { Container, Graphics, Text } from 'pixi.js';
import { createBasicButton } from '../utils/createBasicButton';

export class WinScreen extends Container {
  private messageText: Text;
  private nextButton!: Text;
  private starIcons: Text[] = [];
  constructor(onNext: () => void, onRestart: () => void) {
    super();

    this.createBackground();
    this.messageText = this.createMessageText();
    this.nextButton = this.createNextButton(onNext);
    const restartButton = this.createRestartButton(onRestart);

    this.addChild(this.messageText, restartButton, this.nextButton);
    this.visible = false;
  }
  private createBackground(): void {
    const background = new Graphics()
      .rect(0, 0, 800, 600)
      .fill({ color: 0x000000, alpha: 0.8 });
    this.addChild(background);
  }
  private createMessageText(): Text {
    const text = new Text({
      text: '',
      style: { fontSize: 48, fill: '#ffffff' },
    });
    text.anchor.set(0.5);
    text.position.set(400, 200);
    return text;
  }
  show(mode: 'win' | 'lose', stars: number = 0) {
    this.visible = true;
    this.setMode(mode);
    this.updateStars(mode, stars);
  }

  private updateStars(mode: 'win' | 'lose', stars: number) {
    // Удаляем старые звёзды
    this.starIcons.forEach((icon) => this.removeChild(icon));
    this.starIcons = [];

    if (mode === 'win') {
      for (let i = 0; i < stars; i++) {
        const star = new Text({
          text: '⭐',
          style: { fontSize: 36, fill: '#ffcc00' },
        });
        star.anchor.set(0.5);
        star.position.set(340 + i * 40, 440);
        this.addChild(star);
        this.starIcons.push(star);
      }
    }
  }
  private createRestartButton(onRestart: () => void): Text {
    return createBasicButton('Restart', 400, 300, onRestart);
  }

  private createNextButton(onNext: () => void): Text {
    const btn = createBasicButton('Next Level', 400, 370, onNext);
    btn.visible = false;
    return btn;
  }
  setMode(mode: 'win' | 'lose') {
    if (mode === 'win') {
      this.messageText.text = 'You Win!';
      this.nextButton.visible = true;
    } else {
      this.messageText.text = "Time's Up!";
      this.nextButton.visible = false;
    }
  }
}
