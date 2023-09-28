import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GameCharacterType,
  ICharacter,
  IGamePersonCharacter,
  IGameStarshipCharacter,
} from '../types/icharacter';
import { Observable, map, catchError, BehaviorSubject } from 'rxjs';
import { GameStateService } from './game-state.service';
import { PlayerType } from '../types/icharacter';
import { GameState } from '../types/imodel';

@Injectable()
export class GameCharacterService {
  private _http: HttpClient = inject(HttpClient);
  private _urlPrefix = 'https://www.swapi.tech/api/';

  private _playerCharacter$: BehaviorSubject<ICharacter | null> =
    new BehaviorSubject<ICharacter | null>(null);
  private _enemyCharacter$: BehaviorSubject<ICharacter | null> =
    new BehaviorSubject<ICharacter | null>(null);

  constructor(private _state: GameStateService) {}

  get playerCharacter$(): Observable<ICharacter | null> {
    return this._playerCharacter$.asObservable();
  }

  get enemyCharacter$(): Observable<ICharacter | null> {
    return this._enemyCharacter$.asObservable();
  }

  public load(type: PlayerType = 'PLAYER'): void {
    this._resetCharacters();
    this._state.setLoading();
    const characterType = this._getCharacterType();

    this._http
      .get<IGamePersonCharacter & IGameStarshipCharacter>(
        this._urlPrefix + `${characterType}/${this._getRandomId(83)}`
      )
      .pipe(
        map((character) => ({
          ...character,
          type: GameCharacterType.Person,
        })),
        catchError((err) => {
          this.load();
          this._state.unsetLoading();
          throw err;
        })
      )
      .subscribe((character) => {
        this._state.unsetLoading();
        this._updateCharacter(character, type);
      });
  }

  private _getRandomId(max: number): string {
    return Math.floor(Math.random() * max).toString();
  }

  private _getCharacterType(): 'people' | 'starships' {
    return this._state.characterType === GameCharacterType.Person
      ? 'people'
      : 'starships';
  }

  private _updateCharacter(character: ICharacter, type: PlayerType): void {
    type === 'PLAYER'
      ? this._playerCharacter$.next(character)
      : this._enemyCharacter$.next(character);

    if (!this._state.isStarted) {
      this._state.setGameState(GameState.Started);
    }
  }

  private _resetCharacters(): void {
    this._playerCharacter$.next(null);
    this._enemyCharacter$.next(null);
  }
}
