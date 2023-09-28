import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GameCharacterType,
  ICharacter,
  IGamePersonCharacter,
  IGameStarshipCharacter,
} from '../types/icharacter';
import {
  Observable,
  catchError,
  BehaviorSubject,
  combineLatest,
  map,
} from 'rxjs';
import { GameStateService } from './game-state.service';
import { PlayerType } from '../types/icharacter';
import { GameState, IModel } from '../types/imodel';

@Injectable()
export class GameCharacterService {
  private _http: HttpClient = inject(HttpClient);
  private _urlPrefix = 'https://www.swapi.tech/api/';

  private _playerCharacter$: BehaviorSubject<IModel | null> =
    new BehaviorSubject<IModel | null>(null);
  private _enemyCharacter$: BehaviorSubject<IModel | null> =
    new BehaviorSubject<IModel | null>(null);

  constructor(private _state: GameStateService) {}

  get playerCharacter$(): Observable<IModel | null> {
    return this._playerCharacter$.asObservable();
  }

  get enemyCharacter$(): Observable<IModel | null> {
    return this._enemyCharacter$.asObservable();
  }

  public load(): void {
    this._resetCharacters();
    this._state.setLoading();

    combineLatest([this._loadPlayer$(), this._loadEnemy$()]).subscribe(
      ([player, enemy]) => {
        this._state.unsetLoading();
        this._updateCharacter(player, 'PLAYER');
        this._updateCharacter(enemy, 'ENEMY');

        this._state.comparePoints(player, enemy);
        if (!this._state.isStarted) {
          this._state.setGameState(GameState.Started);
        }
      }
    );
  }

  private _loadEnemy$(): Observable<IModel> {
    const characterType = this._getCharacterType();
    return this._http
      .get<ICharacter>(
        this._urlPrefix + `${characterType}/${this._getRandomId()}`
      )
      .pipe(
        map((character) => this._buildModel(character)),
        catchError(() => this._loadEnemy$())
      );
  }

  private _loadPlayer$(): Observable<IModel> {
    const characterType = this._getCharacterType();
    return this._http
      .get<ICharacter>(
        this._urlPrefix + `${characterType}/${this._getRandomId()}`
      )
      .pipe(
        map((character) => this._buildModel(character)),
        catchError(() => this._loadEnemy$())
      );
  }

  private _getRandomId(): string {
    const max =
      this._state.characterType === GameCharacterType.Person ? 83 : 15;
    return Math.floor(Math.random() * max).toString();
  }

  private _getCharacterType(): 'people' | 'starships' {
    return this._state.characterType === GameCharacterType.Person
      ? 'people'
      : 'starships';
  }

  private _updateCharacter(model: IModel, type: PlayerType): void {
    type === 'PLAYER'
      ? this._playerCharacter$.next(model)
      : this._enemyCharacter$.next(model);
  }

  private _resetCharacters(): void {
    this._playerCharacter$.next(null);
    this._enemyCharacter$.next(null);
    this._state.resetWinner();
  }

  private _buildModel(character: ICharacter): IModel {
    return this._state.characterType === GameCharacterType.Person
      ? this._buildPersonModel(character as IGamePersonCharacter)
      : this._buildStarshipModel(character as IGameStarshipCharacter);
  }

  private _buildPersonModel(character: IGamePersonCharacter): IModel {
    const { name, mass, gender } = character.result.properties;
    return {
      title: name,
      subtitle: gender.toUpperCase(),
      description: character.result.description,
      value: this._calculateValue(mass),
    };
  }

  private _buildStarshipModel(character: IGameStarshipCharacter): IModel {
    const { model, crew, name } = character.result.properties;
    return {
      title: name,
      subtitle: model,
      value: this._calculateValue(crew),
      description: character.result.description,
    };
  }

  private _calculateValue(val: string): number {
    const value = Number(val);
    return isNaN(value) ? 0 : value;
  }
}
