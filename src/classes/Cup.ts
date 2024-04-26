import Drink from '@/types/Drink';
import Serving from '@/types/Serving';
import Topping from '@/types/Topping';

export default class Cup {
  private _drink: Drink;
  private _topping: Topping;
  private _serving: Serving;

  constructor () {
    this._drink = Drink.None;
    this._topping = Topping.None;
    this._serving = Serving.None;
  }

  // Getters and setters

  public get drink (): Drink {
    return this._drink;
  }

  public get topping (): Topping {
    return this._topping;
  }

  public get serving (): Serving {
    return this._serving;
  }

  public setDrink (drink: Drink): Cup {
    const properServings = [Serving.None, Serving.Straw];
    if (
      this._drink === Drink.None &&
      properServings.includes(this._serving)
    ) {
      this._drink = drink;
    }
    return this;
  }

  public setTopping (topping: Topping): Cup {
    const properServings = [Serving.None, Serving.Straw];
    if (
      this._drink !== Drink.None &&
      this._topping === Topping.None &&
      properServings.includes(this._serving)
    ) {
      this._topping = topping;
    }
    return this;
  }

  public setServing (serving: Serving): Cup {
    this._serving = serving;
    return this;
  }

  // Methods
  public randomize (): Cup {
    const drinks = Object.values(Drink).slice(1); // Skip Drink.None
    const toppings = Object.values(Topping);
    const servings = Object.values(Serving);
    console.log(drinks);

    this.setDrink(drinks[Math.floor(Math.random() * drinks.length)]);
    this.setTopping(toppings[Math.floor(Math.random() * toppings.length)]);
    this.setServing(servings[Math.floor(Math.random() * servings.length)]);

    return this;
  }

  public getImageName (): string {
    if (this._serving === Serving.CookieCap) {
      return '002';
    }

    const name = `
      ${this._drink || 0}
      ${this._topping || 0}
      ${this._serving || 0}
    `.replace(/\s/g, ''); // Remove all whitespaces

    return name;
  }

  public isEqual (cup: Cup): boolean {
    return (
      this._drink === cup.drink &&
      this._topping === cup.topping &&
      this._serving === cup.serving
    );
  }

  public isEmpty (): boolean {
    return (
      this._drink === Drink.None &&
      this._topping === Topping.None &&
      this._serving === Serving.None
    );
  }
}
