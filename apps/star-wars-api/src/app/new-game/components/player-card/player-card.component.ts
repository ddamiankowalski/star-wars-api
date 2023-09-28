import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Input,
  OnInit,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { PlayerType } from '../../types/icharacter';
import { GameCharacterService } from '../../services/game-character.service';
import { Observable, map } from 'rxjs';
import { IModel } from '../../types/imodel';
import { GameStateService } from '../../services/game-state.service';

@Component({
  selector: 'swapi-player-card',
  templateUrl: './player-card.component.html',
  styleUrls: ['./player-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [ClassBinder],
})
export class PlayerCardComponent implements OnInit {
  @Input({ required: true }) type!: PlayerType;

  constructor(
    private _classBinder: ClassBinder,
    private _character: GameCharacterService,
    private _state: GameStateService
  ) {
    this._classBinder.bind('swapi-player-card');
  }

  get character$(): Observable<IModel | null> {
    return this.type === 'ENEMY'
      ? this._character.enemyCharacter$
      : this._character.playerCharacter$;
  }

  get winner$(): Observable<PlayerType | 'DRAW' | null> {
    return this._state.roundWinner$;
  }

  get points$(): Observable<number> {
    return this._state.points$.pipe(map((points) => points[this.type]));
  }

  ngOnInit(): void {
    this._classBinder.bind(
      `swapi-player-card--${this.type.toLocaleLowerCase()}`
    );
  }
}
