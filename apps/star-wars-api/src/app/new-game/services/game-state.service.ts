import { Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { GameLoaderComponent } from '../components/game-loader/game-loader.component';
import { GameState } from '../types/imodel';
import { GameCharacterType } from '../types/icharacter';

@Injectable()
export class GameStateService {
  private _loadingRef = 0;
  private _isLoading = false;
  private _characterType: GameCharacterType = GameCharacterType.Person;
  private _gameState: GameState = GameState.Closed;
  private _loadingDialogRef: DialogRef<
    GameLoaderComponent,
    GameLoaderComponent
  > | null = null;

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
}
