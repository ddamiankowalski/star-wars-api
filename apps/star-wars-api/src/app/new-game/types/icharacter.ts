export interface ICharacter {
  message: string;
  description: string;
  type: GameCharacterType;
  result: {
    properties: IGameCommonProperties;
    description: string;
  };
}

interface IGamePersonProperties {
  height: string;
  mass: string;
  name: string;
}

interface IGameStarshipProperties {
  model: string;
  crew: string;
  name: string;
}

interface IGameCommonProperties {
  name: string;
}

export interface IGamePersonCharacter extends ICharacter {
  result: {
    properties: IGamePersonProperties;
    description: string;
  };
}

export interface IGameStarshipCharacter extends ICharacter {
  result: {
    properties: IGameStarshipProperties;
    description: string;
  };
}

export enum GameCharacterType {
  Person = 'PERSON',
  Starship = 'STARSHIP',
}

export type PlayerType = 'PLAYER' | 'ENEMY';
