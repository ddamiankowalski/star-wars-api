import { Injectable } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { GameLoaderComponent } from '../components/game-loader/game-loader.component';

@Injectable()
export class GameStateService {
  private _isLoading = false;
  private _loadingDialogRef: DialogRef<
    GameLoaderComponent,
    GameLoaderComponent
  > | null = null;

  constructor(private _dialog: Dialog) {}

  get isLoading(): boolean {
    return this._isLoading;
  }

  public setLoading(): void {
    this._loadingDialogRef = this._dialog.open(GameLoaderComponent, {
      disableClose: true,
      autoFocus: false,
    });
    this._isLoading = true;
  }

  public unsetLoading(): void {
    this._loadingDialogRef?.close();
    this._isLoading = false;
  }
}
