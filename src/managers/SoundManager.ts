import { Howl } from 'howler';
export class SoundManager {
  static bg: Howl;
  static click: Howl;
  static win: Howl;
  static lose: Howl;
  static completeGame: Howl;

  static isMuted = false;

  static init() {
    this.bg = new Howl({
      src: ['/assets/sounds/bg.mp3'],
      loop: true,
      volume: 0.3,
    });
    this.click = new Howl({ src: ['/assets/sounds/click.mp3'] });
    this.win = new Howl({ src: ['/assets/sounds/win.mp3'] });
    this.lose = new Howl({ src: ['/assets/sounds/lose.mp3'] });
    this.completeGame = new Howl({
      src: ['/assets/sounds/lastLevelWinSound.mp3'],
    });
  }
  static play(sound: keyof typeof SoundManager) {
    if (!this.isMuted && this[sound] instanceof Howl) {
      this[sound].play();
    }
  }

  static toggleMute() {
    this.isMuted = !this.isMuted;
    this.bg.mute(this.isMuted);
  }

  static playBg() {
    if (!this.isMuted && !this.bg.playing()) {
      this.bg.play();
    }
  }
  static playWinGameSound() {
    if (!this.isMuted && !this.completeGame.playing()) {
      this.completeGame.play();
    }
  }
  static stopBg() {
    this.bg.stop();
  }

  static setMuted(muted: boolean) {
    if (this.isMuted === muted) return;
    this.isMuted = muted;
    this.bg?.mute(muted);
    this.click?.mute(muted);
    this.win?.mute(muted);
    this.lose?.mute(muted);
    this.completeGame?.mute(muted);
  }
}
