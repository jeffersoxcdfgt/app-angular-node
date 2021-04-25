import * as fromLogin from './private/store/reducers/login.reducers';
import * as fromProduct from './private/product/store/reducers/product.reducers';
import * as fromShoppingCart from './public/store/reducers/shopping-cart.reducers';

export interface AppState {
  user: fromLogin.State;
  product: fromProduct.State;
  shoppingcart: fromShoppingCart.State;
}
