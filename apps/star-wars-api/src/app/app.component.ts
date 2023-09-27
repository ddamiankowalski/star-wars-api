import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { StarsBackground } from '@star-wars-api/star-wars-bg';

@Component({
  selector: 'star-wars-api-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('starCanvas', { read: ElementRef }) starCanvas!: ElementRef;

  ngAfterViewInit(): void {
    const bg = new StarsBackground(this.starCanvas.nativeElement);
  }
}
