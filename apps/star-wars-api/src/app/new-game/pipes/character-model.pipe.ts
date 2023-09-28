import { Pipe, PipeTransform } from '@angular/core';
import {
  GameCharacterType,
  ICharacter,
  IGamePersonCharacter,
  IGameStarshipCharacter,
} from '../types/icharacter';
import { IModel } from '../types/imodel';

@Pipe({
  name: 'characterModel',
})
export class CharacterModelPipe implements PipeTransform {
  transform(character: ICharacter): IModel {
    return character.type === GameCharacterType.Person
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
