import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';

@Component({
  selector: 'swapi-game-loader',
  templateUrl: './game-loader.component.html',
  styleUrls: ['./game-loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class GameLoaderComponent {
  constructor(classBinder: ClassBinder) {
    classBinder.bind('swapi-game-loader');
  }
}
