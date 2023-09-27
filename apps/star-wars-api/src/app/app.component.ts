import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { ClassBinder } from './common/services/class-binder.service';
import { StarsBackgroundService } from './common/services/star-background.service';

@Component({
  selector: 'swapi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ClassBinder],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  @ViewChild('starCanvas', { read: ElementRef }) starCanvas!: ElementRef;

  private _background = inject(StarsBackgroundService);

  constructor(classBinder: ClassBinder) {
    classBinder.bind('swapi-root');
  }

  ngAfterViewInit(): void {
    this._background.initialize(this.starCanvas.nativeElement);
    this._background.startAnimation();
  }
}
