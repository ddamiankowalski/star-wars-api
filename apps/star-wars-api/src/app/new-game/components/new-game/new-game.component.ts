import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { GameCharacterService } from '../../services/game-character.service';
import { GameCharacterType } from '../../types/icharacter';

@Component({
  selector: 'swapi-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class NewGameComponent implements OnInit {
  constructor(
    classBinder: ClassBinder,
    private _character: GameCharacterService
  ) {
    classBinder.bind('swapi-new-game');
  }

  ngOnInit(): void {
    this.loadPlayerCharacter();
  }

  public loadPlayerCharacter(
    type: GameCharacterType = GameCharacterType.Person
  ): void {
    if (type === GameCharacterType.Person) {
      this._character.getPerson();
      this._character.getPerson('ENEMY');
    } else {
      this._character.getStarship();
      this._character.getStarship('ENEMY');
    }
  }
}
