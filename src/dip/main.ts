import { Messaging } from './services/messaging';

import { Persistence } from './services/persistence';
import { Product } from './classes/product';
import { ShoppingCart } from './classes/shopping-cart';
import { Order } from './classes/order';
import { FiftyPercent, noDiscount } from './classes/discount';
import { EnterpriseCustomer, IndividualCustomer } from './classes/custumer';

const fiftyPercent = new FiftyPercent();
//onst nodiscount = new noDiscount();
const shoppingcart = new ShoppingCart(fiftyPercent);
const messaging = new Messaging();
const persistence = new Persistence();
const individualCustomer = new IndividualCustomer(
  'Thiago ',
  'Henrique',
  ' 456.465.465-45'
);

const enterpriseCustomer = new EnterpriseCustomer(
  'Thiago Henri LTDA ',
  '45435616548676513561654'
);

const order = new Order(
  shoppingcart,
  messaging,
  persistence,
  enterpriseCustomer
);

shoppingcart.addItem(new Product('caderno', 15.59));
shoppingcart.addItem(new Product('lapis', 1.58));
shoppingcart.addItem(new Product('canetas', 32.89));
shoppingcart.addItem(new Product('bolsa', 243.21));
shoppingcart.addItem(new Product('apontador', 8.92));

console.log(shoppingcart.items);
console.log(shoppingcart.total());
console.log(shoppingcart.totalWithDesconunt());
console.log(order.orderStatus);
order.checkOut();
console.log(order.orderStatus);
