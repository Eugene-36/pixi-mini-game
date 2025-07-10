export class ProgressManager {
  private static key = 'gameProgress';

  static saveProgress(data: { level: number; stars: number; muted: boolean }) {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
  static load(): { level: number; stars: number; muted: boolean } | null {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : null;
  }
  static clear() {
    localStorage.removeItem(this.key);
  }
}
