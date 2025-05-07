export interface LevelConfig {
  id: number;
  enemies: number;
  time: number;
  clicksToKill: number;
}

export class LevelManager {
  private static levels: LevelConfig[] = [];
  private static currentLevelIndex: number = 0;

  static async loadLevels() {
    const url = new URL('../../public/assets/levels.json', import.meta.url)
      .href;
    const res = await fetch(url);
    this.levels = await res.json();
  }
  static getCurrentLevel(): LevelConfig {
    return this.levels[this.currentLevelIndex];
  }
  static nextLevel(): void {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
    }
  }
  static isLastLevel(): boolean {
    return this.currentLevelIndex >= this.levels.length - 1;
  }
  static reset(): void {
    this.currentLevelIndex = 0;
  }
  static getLevelId(): number {
    return this.levels[this.currentLevelIndex]?.id || 0;
  }
}
