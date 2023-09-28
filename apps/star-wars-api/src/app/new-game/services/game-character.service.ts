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

  public getPerson(): void {
    this._resetCharacters();
    this._state.setLoading();
    this._http
      .get<IGamePersonCharacter>(
        this._urlPrefix + `people/${this._getRandomId(83)}`
      )
      .pipe(
        map((character) => ({ ...character, type: GameCharacterType.Person })),
        catchError((err) => {
          this.getPerson();
          throw err;
        })
      )
      .subscribe((character) => {
        this._state.unsetLoading();
        this._updateCharacter(character);
      });
  }

  public getStarship(): void {
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
          this.getStarship();
          throw err;
        })
      )
      .subscribe((character) => {
        this._state.unsetLoading();
        this._updateCharacter(character);
      });
  }

  private _getRandomId(max: number): string {
    return Math.floor(Math.random() * max).toString();
  }

  private _updateCharacter(character: ICharacter): void {
    console.log(character);
    this._playerCharacter$.next(character);
  }

  private _resetCharacters(): void {
    this._playerCharacter$.next(null);
    this._enemyCharacter$.next(null);
  }
}
