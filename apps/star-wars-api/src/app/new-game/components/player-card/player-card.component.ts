import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { ICharacter, PlayerType } from '../../types/icharacter';
import { GameCharacterService } from '../../services/game-character.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'swapi-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class PlayerCardComponent {
  @Input({ required: true }) type!: PlayerType;

  constructor(
    classBinder: ClassBinder,
    private _character: GameCharacterService
  ) {
    classBinder.bind('swapi-player-card');
  }

  get character$(): Observable<ICharacter | null> {
    return this.type === 'ENEMY'
      ? this._character.enemyCharacter$
      : this._character.playerCharacter$;
  }
}
