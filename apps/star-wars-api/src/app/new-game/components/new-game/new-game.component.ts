import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { GameCharacterService } from '../../services/game-character.service';
import { GameCharacterType } from '../../types/icharacter';
import { GameStateService } from '../../services/game-state.service';
import { Router } from '@angular/router';
import { GameState } from '../../types/imodel';

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
    private _character: GameCharacterService,
    private _state: GameStateService,
    private _router: Router
  ) {
    classBinder.bind('swapi-new-game');
  }

  get isStarted(): boolean {
    return this._state.isStarted;
  }

  public ngOnInit(): void {
    this.loadCharacters();
  }

  public onQuit(): void {
    this._router.navigate(['']);
    this._state.setGameState(GameState.Closed);
  }

  public nextRound(): void {
    this.loadCharacters();
  }

  get isLoading(): boolean {
    return this._state.isLoading;
  }

  public loadCharacters(
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
