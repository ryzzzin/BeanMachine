import Cup from './Cup';
import Drink from '@/types/Drink';
import Serving from '@/types/Serving';
import Topping from '@/types/Topping';
import getRandomFirstName from '@/utils/getRandomFirstName';

export default class Order {
  cup: Cup;
  name: string;
  message: string;

  constructor (cup?: Cup, name?: string, description?: string) {
    this.cup = cup || new Cup();
    this.name = name || '';
    this.message = description || '';
  }

  public getCustomerAvatarUrl (): string {
    const baseUrl = 'https://api.dicebear.com/8.x/micah/svg?seed=';
    const seed = this.name.replace(' ', '-');
    return `${baseUrl}${seed}`;
  }

  public randomize (): Order {
    this.cup.randomize();
    this.name = getRandomFirstName();
    this.message = this.generateMessage(this.cup);
    return this;
  }

  private generateMessage (cup: Cup): string {
    let message = 'Can I get a';

    switch (cup.drink) {
      case Drink.Coffee:
        message += ' coffee';
        break;
      case Drink.Matcha:
        message += ' matcha';
        break;
      case Drink.Milkshake:
        message += ' milkshake';
        break;
      default:
        message += ' drink';
    }

    if (cup.topping !== Topping.None) {
      message += ' with some';
      switch (cup.topping) {
        case Topping.Ice:
          message += ' ice';
          break;
        case Topping.Cream:
          message += ' cream';
          break;
        case Topping.Marshmallow:
          message += ' marshmallow';
          break;
      }
    }

    if (cup.serving !== Serving.None) {
      switch (cup.serving) {
        case Serving.Straw:
          message += ' and a straw';
          break;
        case Serving.CookieCap:
          message += ' and a cookie';
          break;
        case Serving.TransparentCap:
          message += ' with a transparent cap';
          break;
      }
    }

    message += '?';
    return message;
  }
}
