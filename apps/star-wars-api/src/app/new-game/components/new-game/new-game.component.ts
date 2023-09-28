import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { ClassBinder } from '../../../common/services/class-binder.service';
import { GameCharacterService } from '../../services/game-character.service';
import { GameStateService } from '../../services/game-state.service';
import { Router } from '@angular/router';
import { GameState } from '../../types/imodel';
import { StarsBackgroundService } from '../../../common/services/star-background.service';
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
    private _character: GameCharacterService,
    private _state: GameStateService,
    private _background: StarsBackgroundService,
    private _router: Router
  ) {
    classBinder.bind('swapi-new-game');
  }

  get isStarted(): boolean {
    return this._state.isStarted;
  }

  get isLoading(): boolean {
    return this._state.isLoading;
  }

  get inactiveType(): string {
    return this._state.characterType === GameCharacterType.Person
      ? 'Starships'
      : 'People';
  }

  public ngOnInit(): void {
    this.loadCharacters();
  }

  public onQuit(): void {
    this._router.navigate(['']);
    this._state.setGameState(GameState.Closed);
    this._state.resetPoints();
  }

  public nextRound(): void {
    this.loadCharacters();
    this._background.startAnimation();
  }

  public toggleCharacterType(): void {
    this._state.toggleCharacterType();
  }

  public loadCharacters(): void {
    this._character.load();
  }
}
