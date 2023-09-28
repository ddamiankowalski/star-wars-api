import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IGamePersonCharacter,
  IGameStarshipCharacter,
} from '../types/icharacter';
import { Observable, retry } from 'rxjs';

@Injectable()
export class GameCharacterService {
  private _http: HttpClient = inject(HttpClient);
  private _urlPrefix = 'https://www.swapi.tech/api/';

  public getPerson(): Observable<IGamePersonCharacter> {
    return this._http
      .get<IGamePersonCharacter>(
        this._urlPrefix + `people/${this._getRandomId(83)}`
      )
      .pipe(retry());
  }

  public getStarship(): Observable<IGameStarshipCharacter> {
    return this._http
      .get<IGameStarshipCharacter>(
        this._urlPrefix + `starships/${this._getRandomId(15)}`
      )
      .pipe(retry());
  }

  private _getRandomId(max: number): string {
    return Math.floor(Math.random() * max).toString();
  }
}
