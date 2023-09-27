import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class ClassBinder {
  constructor(private _elementRef: ElementRef) {}

  get nativeElement(): HTMLElement {
    return this._elementRef.nativeElement as HTMLElement;
  }

  public bind(className: string): void {
    this.nativeElement.classList.add(className);
  }
}
