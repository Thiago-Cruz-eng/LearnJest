/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CartItem } from './interface/cart-item';
import { CustumerOrder } from './interface/custumer-protocol';
import { MessagingProtocol } from './interface/messaging-protocol';
import { PersistanceProtocol } from './interface/persistance-protocol';
import { ShoppingCartProtocol } from './interface/shoping-cart-protocol';
import { Order } from './order';

class ShoppingCartMock implements ShoppingCartProtocol {
  get items(): Readonly<CartItem[]> {
    return [];
  }

  addItem(item: CartItem): void {}

  removeItem(index: number): void {}

  total(): number {
    return 1;
  }

  totalWithDesconunt(): number {
    return 2;
  }

  isEmpty(): boolean {
    return false;
  }

  clearOrderStatus(): void {}
}

class MessagingMock implements MessagingProtocol {
  sendMessage() {}
}

class PersistenceMock implements PersistanceProtocol {
  saveOrder(): void {}
}

class CustumerMock implements CustumerOrder {
  getName(): string {
    return '';
  }
  getIDN(): string {
    return '';
  }
}

const creatSut = () => {
  const shoppingCartMock = new ShoppingCartMock();
  const messagingMock = new MessagingMock();
  const persistenceMock = new PersistenceMock();
  const custumerMock = new CustumerMock();
  const sut = new Order(
    shoppingCartMock,
    messagingMock,
    persistenceMock,
    custumerMock
  );
  return { sut, shoppingCartMock, messagingMock, persistenceMock };
};

describe('Order', () => {
  it('should not check out if cart is empty', () => {
    const { sut, shoppingCartMock } = creatSut();
    const shoppingCartMockSpy = jest
      .spyOn(shoppingCartMock, 'isEmpty')
      .mockReturnValueOnce(false);
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
    expect(sut.orderStatus).toBe('closed');
  });

  it('should send a email notification to custumer', () => {
    const { sut, messagingMock } = creatSut();
    const messagingMockSpy = jest.spyOn(messagingMock, 'sendMessage');
    sut.checkOut();
    expect(messagingMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should saveOrder', () => {
    const { sut, persistenceMock } = creatSut();
    const persistenceMockSpy = jest.spyOn(persistenceMock, 'saveOrder');
    sut.checkOut();
    expect(persistenceMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should clear cart', () => {
    const { sut, shoppingCartMock } = creatSut();
    const shoppingCartMockSpy = jest.spyOn(
      shoppingCartMock,
      'clearOrderStatus'
    );
    sut.checkOut();
    expect(shoppingCartMockSpy).toHaveBeenCalledTimes(1);
  });
});
