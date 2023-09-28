import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'swapi-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class NewGameComponent {
  constructor(classBinder: ClassBinder, private _state: GameStateService) {
    classBinder.bind('swapi-new-game');
    setTimeout(() => {
      this._state.setLoading();
    });
  }
}
