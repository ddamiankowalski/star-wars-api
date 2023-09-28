interface ICharacter {
  message: string;
  description: string;
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

export interface IGamePersonCharacter extends ICharacter {
  result: IGamePersonProperties;
}

export interface IGameStarshipCharacter extends ICharacter {
  result: IGameStarshipProperties;
}
