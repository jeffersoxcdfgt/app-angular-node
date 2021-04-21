import * as fromLogin from './private/store/reducers/login.reducers';
import * as fromProduct from './private/product/store/reducers/product.reducers';

export interface AppState {
  user: fromLogin.State;
  product: fromProduct.State;
}
