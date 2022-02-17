export abstract class Discount {
  protected discount = 0;

  calculate(price: number): number {
    return price - price * this.discount;
  }
}

//mas pq de tudo isso? para que eu nao precise alterar o codigo mas sim apenas adicionar
//por exemplo aqu, para adicinar novos descontos eu nao vou alterar a classe
//eu simplismente vou criar uma nova classe ocm um desconto diferente
//e instanciar la no meu main, did u know?

export class FiftyPercent extends Discount {
  protected readonly discount = 0.5;
}

//par anao precisar alterar o codigo fonte tbm caso nao tenha desconto d
//podemos ter o 0 desconto
export class noDiscount extends Discount {}
