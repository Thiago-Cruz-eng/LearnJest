import {
  IndividualCustomerProtocol,
  EnterpriseCustomerProtocol,
  CustumerOrder,
} from './interface/custumer-protocol';

export class IndividualCustomer
  implements IndividualCustomerProtocol, CustumerOrder
{
  firtName: string;
  lastName: string;
  cpf: string;
  cnpj: string;

  constructor(firtName: string, lastName: string, cpf: string) {
    this.firtName = firtName;
    this.lastName = lastName;
    this.cpf = cpf;
    this.cnpj = '';
  }
  getName(): string {
    return this.firtName + '' + this.lastName;
  }
  getIDN(): string {
    return this.cpf;
  }
}

export class EnterpriseCustomer
  implements EnterpriseCustomerProtocol, CustumerOrder
{
  name: string;
  cnpj: string;

  constructor(name: string, cnpj: string) {
    this.name = name;
    this.cnpj = cnpj;
  }
  getName(): string {
    return this.name;
  }
  getIDN(): string {
    return this.cnpj;
  }
}
