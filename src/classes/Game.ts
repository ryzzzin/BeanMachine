import GameState from '@/classes/GameState';
import NotStartedGameState from './NotStartedGameState';
import Order from './Order';
import Cup from './Cup';
import Drink from '@/types/Drink';
import Serving from '@/types/Serving';
import Topping from '@/types/Topping';

export default class Game {
  private _state: GameState = new NotStartedGameState();
  private _currentOrder = new Order();
  private _currentCup = new Cup();

  private _isCupShaking = false;
  private _isCupAnimating = false;
  private _isOrderAnimating = false;

  private _ordersCount = 1;
  private _balance = 0;
  public doneOrderPrice = 10;
  public mistakePrice = 6;
  public remakePrice = 2;

  public get state (): GameState {
    return this._state;
  }

  public get ordersCount (): number {
    return this._ordersCount;
  }

  public get balance (): number {
    return this._balance;
  }

  public get currentOrder (): Order {
    return this._currentOrder;
  }

  public get currentCup (): Cup {
    return this._currentCup;
  }

  public get isCupShaking (): boolean {
    return this._isCupShaking;
  }

  public get isCupAnimating (): boolean {
    return this._isCupAnimating;
  }

  public get isOrderAnimating (): boolean {
    return this._isOrderAnimating;
  }

  setDrink (drink: Drink): void {
    this.playCupShake();
    setTimeout(() => {
      this._currentCup.setDrink(drink);
    }, 125);
  }

  setTopping (topping: Topping): void {
    this.playCupShake();
    setTimeout(() => {
      this._currentCup.setTopping(topping);
    }, 125);
  }

  setServing (serving: Serving): void {
    this.playCupShake();
    setTimeout(() => {
      this._currentCup.setServing(serving);
    }, 125);
  }

  playCupShake (): void {
    this._isCupShaking = true;
    setTimeout(() => {
      this._isCupShaking = false;
    }, 250);
  }

  resetCup (): void {
    this._isCupAnimating = true;
    setTimeout(() => {
      this._currentCup = new Cup();
      this._isCupAnimating = false;
    }, 250);
  }

  remakeCup (): void {
    if (this._currentCup.isEmpty()) return;

    if (this._currentCup.drink !== Drink.None) {
      this._balance -= this.remakePrice;
    }
    this.resetCup();
  }

  randomizeOrder (): void {
    this._currentOrder = new Order().randomize();
  }

  startGame (): void {
    console.log(this);

    if (!(this._state instanceof NotStartedGameState)) return;

    this.randomizeOrder();
    this.resetCup();
    this.nextState();
  }

  nextOrder (): void {
    this._ordersCount++;

    const orderedCup = this._currentOrder.cup as Cup;
    if (this._currentCup.isEqual(orderedCup)) {
      this._balance += this.doneOrderPrice;
    } else {
      this._balance -= this.mistakePrice;
    }

    this.randomizeOrder();
    this.resetCup();

    this._isOrderAnimating = true;
    setTimeout(() => {
      this._isOrderAnimating = false;
    }, 250);
  }

  public nextState (): void {
    this._state = this._state.next();
  }

  public reset (): void {
    this._state = new NotStartedGameState();
  }
}
