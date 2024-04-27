import GameState from './GameState';
import InProgressGameState from './InProgressGameState';

export default class NotStartedGameState extends GameState {
  constructor () {
    super('Not Started', InProgressGameState);
  }

  static createInstance (): GameState {
    return new NotStartedGameState();
  }
}
