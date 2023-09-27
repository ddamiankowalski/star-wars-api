import { AnimationManager } from './animation-manager';
import { StarRenderer } from './star-renderer';
import { Star } from './star';
import { ISize } from './interfaces';

export class StarsBackground {
  private _size: ISize;
  private _stars: Set<Star>;
  private _renderer: StarRenderer;

  constructor(private _canvas: HTMLCanvasElement) {
    this._size = this._setSize();
    this._stars = this._initializeStars();
    this._renderer = new StarRenderer();

    this.draw();
  }

  get context(): CanvasRenderingContext2D {
    const context = this._canvas.getContext('2d');

    if (!context) {
      throw new Error('Could not get 2DContext');
    }
    return context;
  }

  startAnimation(): void {
    AnimationManager.startAnimation(this);
  }

  update(mult: number): void {
    this._stars.forEach((star) =>
      star.updateCoordinates(this._size, this._stars, mult)
    );
  }

  draw(): void {
    this._renderer.render(this._stars, this.context, this._size);
  }

  private _setSize() {
    this._canvas.width = window.innerWidth;
    this._canvas.height = window.innerHeight;

    window.onresize = () => {
      this._canvas.width = window.innerWidth;
      this._canvas.height = window.innerHeight;

      this._size = { width: window.innerWidth, height: window.innerHeight };
      this._stars = this._initializeStars();
      this.draw();
    };

    return { width: window.innerWidth, height: window.innerHeight };
  }

  private _initializeStars(): Set<Star> {
    return Star.createCollection(1400, this._size);
  }
}
