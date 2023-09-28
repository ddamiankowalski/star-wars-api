import { Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { GameLoaderComponent } from '../components/game-loader/game-loader.component';
import { GameState, IModel, IPoints } from '../types/imodel';
import { GameCharacterType, PlayerType } from '../types/icharacter';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class GameStateService {
  private _loadingRef = 0;
  private _isLoading = false;
  private _characterType: GameCharacterType = GameCharacterType.Person;
  private _gameState: GameState = GameState.Closed;
  private _points: IPoints = { ENEMY: 0, PLAYER: 0 };
  private _loadingDialogRef: DialogRef<
    GameLoaderComponent,
    GameLoaderComponent
  > | null = null;

  private _roundWinner$: BehaviorSubject<PlayerType | 'DRAW' | null> =
    new BehaviorSubject<PlayerType | 'DRAW' | null>(null);
  private _points$: BehaviorSubject<IPoints> = new BehaviorSubject(
    this._points
  );

  constructor(private _dialog: Dialog) {}

  get isLoading(): boolean {
    return this._isLoading;
  }

  get isStarted(): boolean {
    return this._gameState === GameState.Started;
  }

  get characterType(): GameCharacterType {
    return this._characterType;
  }

  get roundWinner$(): Observable<PlayerType | 'DRAW' | null> {
    return this._roundWinner$.asObservable();
  }

  get points$(): Observable<IPoints> {
    return this._points$.asObservable();
  }

  public comparePoints(player: IModel, enemy: IModel): void {
    let winner: PlayerType | 'DRAW' = 'DRAW';

    if (player.value > enemy.value) {
      winner = 'PLAYER';
      this._addPoint('PLAYER');
    } else if (player.value < enemy.value) {
      winner = 'ENEMY';
      this._addPoint('ENEMY');
    }

    this._roundWinner$.next(winner);
  }

  public resetPoints(): void {
    this._points = { ENEMY: 0, PLAYER: 0 };
    this._points$.next(this._points);
  }

  public resetWinner(): void {
    this._roundWinner$.next(null);
  }

  public toggleCharacterType(): void {
    this._characterType =
      this._characterType === GameCharacterType.Person
        ? GameCharacterType.Starship
        : GameCharacterType.Person;
  }

  public setGameState(state: GameState): void {
    this._gameState = state;
  }

  public setLoading(): void {
    this._loadingRef++;

    if (this.isLoading) {
      return;
    }

    this._loadingDialogRef = this._dialog.open(GameLoaderComponent, {
      disableClose: true,
      autoFocus: false,
    });

    this._isLoading = true;
  }

  public unsetLoading(): void {
    this._loadingRef--;

    if (this._loadingRef === 0) {
      this._loadingDialogRef?.close();
      this._isLoading = false;
    }
  }

  private _addPoint(type: PlayerType): void {
    this._points[type]++;
  }
}
