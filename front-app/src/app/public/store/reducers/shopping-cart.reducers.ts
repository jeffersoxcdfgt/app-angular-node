import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer , Action  } from '@ngrx/store';
import { Product } from '../../../private/product/class/product';
import * as shoppingCartActions from '../actions/shopping-cart.actions';

export interface State {
  data: Product[];
  selected: Product;
  action: string;
  done: boolean;
  error?: Error;
}

const initialState: State  = {
  data: [],
  selected: null,
  action: null,
  done: false,
  error: null
};

const shoppingCartReducer = createReducer(
  initialState,
  // Add product to shopping cart
  on(shoppingCartActions.shoppingCartAdd,
    (state, { product }) => (
     {
        ...state, selected: product,
        action: shoppingCartActions.ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART,
        done: false,
        error: null
      }
   )),
  on(shoppingCartActions.shoppingCartAddSuccess,
    (state, { product }) => ({
      ...state,
      selected: product,
      done: true,
      error:
      null
  })),
  on(shoppingCartActions.shoppingCartAddError,
       (state, { err }) => ({
         ...state,
         done: true,
         selected: null,
         error: err
  }))
);

export function reducer(state: State | undefined, action: AppAction): any {
  return shoppingCartReducer(state, action);
}


export const getShoppingCartState = createFeatureSelector < State > ('shoppingcart');

export const getProductInShoppingCart = createSelector( getShoppingCartState , ( state: State ) => {
  if (state.action ===  shoppingCartActions.ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});

export const getProductInShoppingCartError = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_ERROR
    ? state.error
   : null;
});
