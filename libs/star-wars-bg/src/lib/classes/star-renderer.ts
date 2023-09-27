import { ISize } from './interfaces';
import { Star } from './star';

export class StarRenderer {
  render(
    collection: Set<Star>,
    context: CanvasRenderingContext2D,
    size: ISize
  ) {
    context.clearRect(0, 0, size.width, size.height);

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, size.width, size.height);

    collection.forEach((star) => this.renderStar(star, context));
  }

  renderStar(star: Star, context: CanvasRenderingContext2D): void {
    context.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    context.beginPath();
    context.arc(
      star.coordinates.x,
      star.coordinates.y,
      star.size,
      0,
      2 * Math.PI
    );
    context.fill();
  }
}
