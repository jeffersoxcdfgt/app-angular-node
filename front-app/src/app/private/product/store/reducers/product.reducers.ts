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
        data: products === undefined ? state.data : products ,
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
    on(productActions.productCreateSuccess, (state, {product
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
    on(productActions.productCreateError, (state, { err }) => ({
         ...state,
         done: true,
          selected: null,
          error: err
      })),

      // Get product

      on(productActions.productGet, state =>
         ({
           ...state,
           action: productActions.ProductsActionTypes.GET_PRODUCT,
           done: false,
           selected: null,
           error: null
          })),
      on(productActions.productGetSuccess, (state, { productdata }) => ({
           ...state,
           selected: productdata,
           done: true,
           error:  null
        })),
      on(productActions.productGetError, (state, { err }) => ({
        ...state,
        done: true,
        selected: null,
        error: err
      })),

      // Update product

      on(productActions.productUpdate, (state, { productupdate }) => ({
         ...state,
         selected:
         productupdate,
         action:
         productActions.ProductsActionTypes.UPDATE_PRODUCT,
         done: false,
         error:
         null
        })),
      on(
        productActions.prodcutUpdateSuccess,
        state => ({
            ...state,
            data: [
              ...state.data.filter((data) => data.id !== state.selected.id),
              state.selected
             ],
            done: true,
            selected: state.selected,
            error: null
          }
        )),
      on(productActions.prodcutUpdateError,
         (state, { err }) => (
           {...state,
            done: true,
            selected: null,
            error: err
      })),


      // Delete product

      on(productActions.productDelete, (state, { idproduct }) =>
          ({
            ...state,
            selected: state.data.find(h => h.id === idproduct),
            action: productActions.ProductsActionTypes.DELETE_PRODUCT,
            done: false, error: null
          })),
      on(productActions.productDeleteSuccess,
          state => ({
            ...state,
             data: state.data.filter( h => h.id !== state.selected.id),
             selected: null,
             error: null,
             done: true
             })),

      on(productActions.productDeleteError,
          (state, { err }) =>
          ({
            ...state,
            selected: null,
            done: true,
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
    return state.done;
  } else{
    return null;
  }
});


// Selector for Get Product

export const getProduct = createSelector( getProductsState , ( state: State ) => {
  if (state.action ===  productActions.ProductsActionTypes.GET_PRODUCT && state.done){
    return state.selected;
  } else{
    return null;
  }
});

export const getProductError = createSelector(getProductsState, (state: State) => {
  return state.action === productActions.ProductsActionTypes.GET_PRODUCT
    ? state.error
   : null;
});


// Selector for update

export const isUpdated = createSelector(getProductsState , (state: State ) =>
  state.action === productActions.ProductsActionTypes.UPDATE_PRODUCT  && state.done && !state.error);

export const getUpdateError = createSelector(getProductsState, (state: State) => {
      return state.action === productActions.ProductsActionTypes.UPDATE_PRODUCT
        ? state.error
       : null;
});

// Selector for Delete Team

export const isDeleted = createSelector(getProductsState , (state: State) =>
  state.action === productActions.ProductsActionTypes.DELETE_PRODUCT && state.done && !state.error);

export const getDeleteError = createSelector(getProductsState, (state: State) => {
  return state.action === productActions.ProductsActionTypes.DELETE_PRODUCT_SUCCESS
    ? state.error
   : null;
});
