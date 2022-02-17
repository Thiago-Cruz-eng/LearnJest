import { Discount } from './discount';
import { CartItem } from './interface/cart-item';
import { ShoppingCartProtocol } from './interface/shoping-cart-protocol';

export class ShoppingCart implements ShoppingCartProtocol {
  //definindo as caracteristicas do meu cart
  private readonly _items: CartItem[] = [];

  constructor(private readonly discount: Discount) {}

  addItem(item: CartItem): void {
    this._items.push(item);
  }

  removeItem(index: number): void {
    //pensei num pop aqui, mas pensa so, um pop tirariia apenas o ultimo item
    //com splice eu tiro qualuqer um que eu queira sabendo o index
    this._items.splice(index, 1);
  }

  get items(): Readonly<CartItem[]> {
    return this._items;
  }

  total(): number {
    //tofixed transforma em string, logo daria erro, por isso esse '+' ali.
    //ele ja converte de string para number depois de tudo
    return +this._items
      .reduce((total, next) => total + next.price, 0)
      .toFixed(2);
  }

  totalWithDesconunt(): number {
    return this.discount.calculate(this.total());
  }

  isEmpty(): boolean {
    return this._items.length === 0;
  }

  clearOrderStatus(): void {
    console.log('cart cleared successfully');
    this._items.length = 0;
  }
}
