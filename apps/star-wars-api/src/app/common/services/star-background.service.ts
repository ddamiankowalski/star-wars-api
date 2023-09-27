import { Injectable } from '@angular/core';
import { StarsBackground } from '@star-wars-api/star-wars-bg';

@Injectable({ providedIn: 'root' })
export class StarsBackgroundService {
  private _background: StarsBackground | null = null;

  public initialize(canvas: HTMLCanvasElement): StarsBackground {
    this._background = new StarsBackground(canvas);
    return this._background;
  }

  public startAnimation(): void {
    if (!this._background) {
      return;
    }

    this._background.startAnimation();
  }
}
