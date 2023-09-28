export interface IModel {
  subtitle: string;
  title: string;
  description: string;
  value: number;
}

export enum GameState {
  Started = 'STARTED',
  Closed = 'CLOSED',
}
