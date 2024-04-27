import GameState from './GameState';
import FinishedGameState from './FinishedGameState';

export default class InProgressGameState extends GameState {
  constructor () {
    super('Not Started', FinishedGameState);
  }

  static createInstance (): GameState {
    return new InProgressGameState();
  }
}
