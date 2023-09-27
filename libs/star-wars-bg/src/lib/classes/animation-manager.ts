import { StarsBackground } from './stars-background';

export class AnimationManager {
  static startAnimation(starsBackground: StarsBackground) {
    let startTime: number | null = null;
    let endTime: number | null = null;
    const durationTime = 2000;

    function start(timeStamp: number): void {
      startTime = timeStamp;
      endTime = startTime + durationTime;
      frameStep(timeStamp);
    }

    function frameStep(now: number): void {
      if (!endTime || !startTime || now > endTime) return;
      const progress = (now - startTime) / durationTime;
      const mult = AnimationManager.easeInOutCubic(progress);
      starsBackground.update(mult);
      starsBackground.draw();
      window.requestAnimationFrame(frameStep);
    }

    requestAnimationFrame(start);
  }

  static easeInOutCubic(x: number): number {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }
}
