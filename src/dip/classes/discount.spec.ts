import { Discount, noDiscount, FiftyPercent } from './discount';

const createSut = (className: new () => Discount): Discount => {
  return new className();
};

describe('Discount', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have noDiscount ', () => {
    //System under test
    const sut = createSut(noDiscount);
    expect(sut.calculate(10.99)).toBe(10.99);
  });
  it('should apply fiftyPercent ', () => {
    //System under test
    const sut = createSut(FiftyPercent);
    expect(sut.calculate(150.5)).toBe(75.25);
  });
});
