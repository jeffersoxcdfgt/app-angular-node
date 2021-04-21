import {  AppAction } from '../../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer } from '@ngrx/store';
import { Product } from '../../class/product';
import * as productActions from '../actions/product.actions';

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

const productReducer = createReducer(
  initialState,
  // List Product
  on(productActions.productsGetAll, state => ({
    ...state,
    action: productActions.ProductsActionTypes.GET_PRODUCTS,
    done: false,
    selected: null,
    error: null
  })),
  on(productActions.productsGetAllSuccess, (state, {
     products
    }) =>
     ({
        ...state,
        data: products,
        done: true,
        selected: null,
        error: null
      })),
  on(productActions.productsGetAllError, (state, {
     err
    }) =>
    ({
      ...state,
       done: true,
       selected: null,
       error: err
      })),
);

export function reducer(state: State | undefined, action: AppAction): any {
  return productReducer(state, action);
}
export const getProductsState = createFeatureSelector < State > ('product');

// Selector for list products

export const getAllProducts = createSelector( getProductsState , (state: State ) => state.data);
export const getProductsError = createSelector(getProductsState, (state: State) => {
  return state.action === productActions.ProductsActionTypes.GET_PRODUCTS
    ? state.error
   : null;
});
