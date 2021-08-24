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
    // Create Product
    on(productActions.productCreate, (state,
                                      {
        product
         }) => ({
           ...state,
           selected: product,
           action: productActions.ProductsActionTypes.CREATE_PRODUCT,
           done: false,
           error:
           null
       })),
    on(productActions.productCreateSuccess, (state,
                                             {
        product
         }) => ({
           ...state,
           data: [
             ...state.data, {
             ...state.selected,
             id: product.id
            }],
            selected:
            null, done:
            true
          })),
    on(productActions.productCreateError, (state,
                                           { err }) => ({
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


// Create Product

export const isCreated = createSelector( getProductsState , ( state: State ) => {
  if (state.action ===   productActions.ProductsActionTypes.CREATE_PRODUCT && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});

