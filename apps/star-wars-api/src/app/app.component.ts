import { Component } from '@angular/core';
import { starWarsBg } from '@star-wars-api/star-wars-bg';

@Component({
  selector: 'star-wars-api-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'star-wars-api';

  constructor() {
    console.log(starWarsBg);
  }
}
