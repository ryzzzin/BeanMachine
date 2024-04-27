export default class GameState {
  public name: string;
  public nextState: typeof GameState;

  constructor (name: string, nextState: typeof GameState) {
    this.name = name;
    this.nextState = nextState;
  }

  next (): GameState {
    return this.nextState.createInstance();
  }

  static createInstance (): GameState {
    throw new Error("Method 'createInstance()' must be implemented.");
  }
}
