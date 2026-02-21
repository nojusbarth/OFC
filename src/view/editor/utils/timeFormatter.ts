/**
 * Formatiert Sekunden in MM:SS Format
 * @param seconds - Zeit in Sekunden
 * @returns Formatierte Zeit als String (z.B. "02:35")
 */
export function formatTime(seconds: number): string {
  if (seconds < 0) {
    console.error("Negative Sekunden werden nicht unterstützt");
    return "00:00";
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}
