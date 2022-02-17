import { IndividualCustomer, EnterpriseCustomer } from './custumer';

const createIndividualCustomer = (
  firstName: string,
  lastName: string,
  cpf: string
): IndividualCustomer => {
  return new IndividualCustomer(firstName, lastName, cpf);
};
const createEntrepriseCustumer = (
  name: string,
  cnpj: string
): EnterpriseCustomer => {
  return new EnterpriseCustomer(name, cnpj);
};

describe('EnterpriseCustomer', () => {
  afterEach(() => jest.clearAllMocks());

  it('should have firstName, lastName e cpf ', () => {
    //System under test
    const sut = createEntrepriseCustumer('Thiago', '456.465.465-45');
    expect(sut).toHaveProperty('name', 'Thiago');
    expect(sut).toHaveProperty('cnpj', '456.465.465-45');
  });

  it('should I have methods to get name and idn ', () => {
    //System under test
    const sut = createEntrepriseCustumer('Thiago', '456.465.465-45');
    expect(sut.getName()).toBe('Thiago');
    expect(sut.getIDN()).toBe('456.465.465-45');
  });

  describe('IndividualCustomer', () => {
    afterEach(() => jest.clearAllMocks());

    it('should have firstName, lastName e cpf ', () => {
      //System under test
      const sut = createIndividualCustomer(
        'Thiago',
        'Henrique',
        '456.465.465-45'
      );
      expect(sut).toHaveProperty('firstName', 'Thiago');
    });

    it('should I have methods to get name and idn ', () => {
      //System under test
      const sut = createIndividualCustomer(
        'Thiago',
        'Henrique',
        '456.465.465-45'
      );
      expect(sut.getName()).toBe('ThiagoHenrique');
      expect(sut.getIDN()).toBe('456.465.465-45');
    });
  });
});
