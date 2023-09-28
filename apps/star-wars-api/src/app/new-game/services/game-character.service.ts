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

  public getPerson(type: PlayerType = 'PLAYER'): void {
    this._resetCharacters();
    this._state.setLoading();
    this._http
      .get<IGamePersonCharacter>(
        this._urlPrefix + `people/${this._getRandomId(83)}`
      )
      .pipe(
        map((character) => ({ ...character, type: GameCharacterType.Person })),
        catchError((err) => {
          this.getPerson(type);
          throw err;
        })
      )
      .subscribe((character) => {
        this._state.unsetLoading();
        this._updateCharacter(character, type);
      });
  }

  public getStarship(type: PlayerType = 'PLAYER'): void {
    this._resetCharacters();
    this._state.setLoading();
    this._http
      .get<IGameStarshipCharacter>(
        this._urlPrefix + `starships/${this._getRandomId(15)}`
      )
      .pipe(
        map((character) => ({
          ...character,
          type: GameCharacterType.Starship,
        })),
        catchError((err) => {
          this.getStarship(type);
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

  private _updateCharacter(character: ICharacter, type: PlayerType): void {
    type === 'PLAYER'
      ? this._playerCharacter$.next(character)
      : this._enemyCharacter$.next(character);
  }

  private _resetCharacters(): void {
    this._playerCharacter$.next(null);
    this._enemyCharacter$.next(null);
  }
}
