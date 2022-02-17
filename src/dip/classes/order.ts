import { CustumerOrder } from './interface/custumer-protocol';
import { MessagingProtocol } from './interface/messaging-protocol';
import { OrderStatus } from './interface/order-status';
import { PersistanceProtocol } from './interface/persistance-protocol';
import { ShoppingCartProtocol } from './interface/shoping-cart-protocol';

export class Order {
  private _orderStatus: OrderStatus = 'open';
  constructor(
    private readonly cart: ShoppingCartProtocol,
    private readonly messaging: MessagingProtocol,
    private readonly persistence: PersistanceProtocol,
    private readonly custumer: CustumerOrder
  ) {}

  get orderStatus(): OrderStatus {
    return this._orderStatus;
  }

  checkOut(): void {
    if (this.cart.isEmpty()) {
      console.log('Please select at least one item');
    }

    this._orderStatus = 'closed';
    this.messaging.sendMessage(
      `Your itens had been processed successfully ${this.cart.totalWithDesconunt()}`
    );
    this.persistence.saveOrder();
    this.cart.clearOrderStatus();

    console.log(
      'O cliente [e' + this.custumer.getName() + ' ' + this.custumer.getIDN()
    );
  }
}
