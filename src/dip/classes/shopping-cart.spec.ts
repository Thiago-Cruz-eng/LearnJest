import { Discount } from './discount';
import { CartItem } from './interface/cart-item';
import { ShoppingCart } from './shopping-cart';

const createSut = () => {
  const discountMock = createDiscountMock();
  const sut = new ShoppingCart(discountMock);
  return { sut, discountMock };
};

const createDiscountMock = () => {
  class DiscountMock extends Discount {}
  return new DiscountMock();
};

//criar um mock / declara qual quer / o que ele recebe ou declara para retorno
// depois faz o normal
const createCartItem = (name: string, price: number) => {
  class CartItemMock implements CartItem {
    constructor(public name: string, public price: number) {}
  }
  return new CartItemMock(name, price);
};

const creatSutWithProduct = () => {
  //let`s create a mock shopping
  const { sut, discountMock } = createSut();
  const item1 = createCartItem('camiseta', 39);
  const item2 = createCartItem('calca', 49);
  sut.addItem(item1);
  sut.addItem(item2);
  return { sut, discountMock };
};

describe('ShoppingCart', () => {
  it('should be an empty cart when no items are added', () => {
    //let`s create a mock shopping
    const { sut } = createSut();
    expect(sut.isEmpty()).toBe(true);
  });
  it('should have 2 cart itens', () => {
    //let`s create a mock shopping
    const { sut } = creatSutWithProduct();
    expect(sut.items.length).toBe(2);
  });
  it('should test total and totalWithDisconunt', () => {
    //let`s create a mock shopping
    const { sut } = creatSutWithProduct();
    expect(sut.total()).toBe(88);
    expect(sut.totalWithDesconunt()).toBe(88);
  });
  it('should add products and clear cart', () => {
    //let`s create a mock shopping
    const { sut } = creatSutWithProduct();
    expect(sut.items.length).toBe(2);
    sut.clearOrderStatus();
    expect(sut.items.length).toBe(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should remove itens', () => {
    //let`s create a mock shopping
    const { sut } = creatSutWithProduct();
    expect(sut.items.length).toBe(2);
    sut.removeItem(1);
    expect(sut.items.length).toBe(1);
    sut.removeItem(0);
    expect(sut.isEmpty()).toBe(true);
  });

  it('should call discount.calculate(price) when discount is called once', () => {
    //let`s create a mock shopping
    const { sut, discountMock } = creatSutWithProduct();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDesconunt();
    expect(discountMockSpy).toHaveBeenCalledTimes(1);
  });

  it('should call discount.calculate with total price when discount is called', () => {
    //let`s create a mock shopping
    const { sut, discountMock } = creatSutWithProduct();
    const discountMockSpy = jest.spyOn(discountMock, 'calculate');
    sut.totalWithDesconunt();
    expect(discountMockSpy).toHaveBeenCalledWith(sut.total());
  });
});
