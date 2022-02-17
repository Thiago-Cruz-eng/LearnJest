import { CartItem } from './cart-item';

export interface ShoppingCartProtocol {
  //definindo as caracteristicas do meu cart
  items: Readonly<CartItem[]>;

  addItem(item: CartItem): void;

  removeItem(index: number): void;

  total(): number;

  totalWithDesconunt(): number;

  isEmpty(): boolean;

  clearOrderStatus(): void;
}
