import GameState from './GameState';

export default class FinishedGameState extends GameState {
  constructor () {
    super('Finished', FinishedGameState);
  }

  static createInstance (): GameState {
    return new FinishedGameState();
  }
}
