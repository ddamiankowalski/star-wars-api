import { ICoordinate, ISize } from './interfaces';

export class Star {
  private _size: number;
  private _coordinates: ICoordinate;
  private _initialCoordinates: ICoordinate;
  private _vector: ICoordinate;
  private _opacity: number;

  static createCollection(num: number, size: ISize): Set<Star> {
    const collection = new Set<Star>();
    for (let i = 0; i < num; i++) {
      collection.add(new Star(size));
    }

    return collection;
  }

  get coordinates(): ICoordinate {
    return this._coordinates;
  }

  get size(): number {
    return this._size;
  }

  get opacity(): number {
    return this._opacity;
  }

  constructor(private _canvasSize: ISize) {
    this._coordinates = this._setCoordinates(this._canvasSize);
    this._initialCoordinates = {
      x: this._coordinates.x,
      y: this._coordinates.y,
    };
    this._size = this._createStarSize();
    this._vector = this._createVector(this._canvasSize);
    this._opacity = this._createOpacity();
  }

  getCanvasMiddleCoord(size: ISize) {
    return { x: size.width / 2, y: size.height / 2 };
  }

  updateCoordinates(size: ISize, collection: Set<Star>, mult: number): void {
    this._coordinates.x += this._vector.x * mult * 200;
    this._coordinates.y += this._vector.y * mult * 100;
    this.checkInBounds(size, collection);
  }

  updateLineCoordinates(mult: number): void {
    this._initialCoordinates.x += this._vector.x * mult * 200;
    this._initialCoordinates.y += this._vector.y * mult * 100;
  }

  checkInBounds(size: ISize, collection: Set<Star>) {
    if (
      this._coordinates.x > size.width ||
      this._coordinates.x < 0 ||
      this._coordinates.y > size.height ||
      this._coordinates.y < 0
    ) {
      collection.delete(this);
      this._replaceStar(size, collection);
    }
  }

  private _createVector(size: ISize): ICoordinate {
    const middleCoord = this.getCanvasMiddleCoord(size);
    return {
      x: (this._coordinates.x - middleCoord.x) / middleCoord.x,
      y: (this._coordinates.y - middleCoord.y) / middleCoord.y,
    };
  }

  private _replaceStar(size: ISize, collection: Set<Star>) {
    collection.add(new Star(size));
  }

  private _setCoordinates(size: ISize): ICoordinate {
    const x = Math.floor(Math.random() * size.width);
    const y = Math.floor(Math.random() * size.height);

    return { x, y };
  }

  private _createStarSize(): number {
    return Math.random() * 2;
  }

  private _createOpacity(): number {
    return Math.random();
  }
}
