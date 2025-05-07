export function getStars(levelTime: number, timeLeft: number): number {
  const ratio = timeLeft / levelTime;

  if (ratio >= 0.67) return 3;
  if (ratio >= 0.34) return 2;
  return 1;
}
