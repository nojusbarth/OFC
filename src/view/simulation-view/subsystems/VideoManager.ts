/**
 * VideoManager: Zeichnet die Canvas während der Simulation auf.
 * Start/Stop per Event oder manuell.
 */
export class VideoManager {
  private recorder: MediaRecorder | null = null;
  private chunks: BlobPart[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private fps: number = 60;

  constructor(fps: number = 60) {
    this.fps = fps;
  }

  /**
   * Setzt die Canvas-Referenz. Muss aufgerufen werden, bevor Recording startet.
   */
  public setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  /**
   * Startet die Aufzeichnung.
   */
  public start(): void {
    if (!this.canvas) {
      console.error("VideoManager: Canvas not set. Call setCanvas() first.");
      return;
    }

    try {
      const stream = this.canvas.captureStream(this.fps);

      this.chunks = [];
      this.recorder = new MediaRecorder(stream, {
        mimeType: "video/webm;",
        videoBitsPerSecond: 20_000_000,
      });

      this.recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          this.chunks.push(e.data);
        }
      };

      this.recorder.onstop = () => {
        this.onRecordingStop();
      };

      this.recorder.start();

      console.log("🔴 Recording started...");
    } catch (error) {
      console.error("VideoManager: Failed to start recording:", error);
    }
  }

  /**
   * Stoppt die Aufzeichnung und speichert das Video.
   */
  public stop(): void {
    if (!this.recorder) {
      console.warn("VideoManager: Not recording.");
      return;
    }

    this.recorder.stop();
  }

  /**
   * Wird aufgerufen, wenn Recording stoppt.
   * Speichert das Video als Datei.
   */
  private onRecordingStop(): void {
    const blob = new Blob(this.chunks, { type: "video/webm" });
    this.downloadVideo(blob);
    this.cleanup();

    console.log("✅ Recording stopped and saved.");
  }

  private downloadVideo(blob: Blob): void {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `drone-show-${new Date().toISOString().slice(0, 10)}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  private cleanup(): void {
    this.recorder = null;
    this.chunks = [];
  }
}
