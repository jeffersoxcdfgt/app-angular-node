import {  AppAction } from '../../../app.action';
import { createFeatureSelector , createSelector, on , createReducer , Action  } from '@ngrx/store';
import { Product } from '../../../private/product/class/product';
import * as shoppingCartActions from '../actions/shopping-cart.actions';

export interface State {
  data: Product[] | string;
  selected: Product | any;
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
        ...state,
        selected: product,
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
  })),
  // List products from shopping cart
  on(shoppingCartActions.getListShoppingCart,
    (state, { products }) => (
     {
        ...state,
        data: products,
        action: shoppingCartActions.ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART,
        done: false,
        error: null
      }
   )),
   on(shoppingCartActions.getListShoppingCartSuccess,
    (state, { products }) => ({
      ...state,
      data: products,
      done: true,
      error:
      null
  })),
  on(shoppingCartActions.getListShoppingCartError,
    (state, { err }) => ({
      ...state,
      done: true,
      selected: null,
      error: err
  })),
  // Update amount of products
  on(shoppingCartActions.updateAmountOfproducts,
     (state, { amount }) => (
      {
          ...state,
          selected: amount,
          action: shoppingCartActions.ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART,
          done: false,
          error: null
        }
  )),
  on(shoppingCartActions.updateAmountOfproductsSuccess,
    (state, { amount }) => ({
      ...state,
      selected: amount,
      done: true,
      error:
      null
  })),
  on(shoppingCartActions.updateAmountOfproductsError,
    (state, { err }) => ({
      ...state,
      done: true,
      selected: null,
      error: err
  })),

  // Get list products last list

  on(shoppingCartActions.getListproductslast,
     state => (
      { ...state,
        action: shoppingCartActions.ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS,
        done: false,
        data: 'lstproducts',
        selected: null,
        error: null
   })),

   on(shoppingCartActions.getListproductslastSuccess,
    state => (
     { ...state,
       action: shoppingCartActions.ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS_SUCCESS,
       done: false,
       selected: null,
       error: null
  })),

  on(shoppingCartActions.getListproductslastError,
    (state, { err }) => ({
      ...state,
      done: true,
      selected: null,
      error: err
  })),

  // Get list products with amount

  on(shoppingCartActions.getlistProductsamount,
    (state, { lstproamount }) => (
    {
        ...state,
        selected: lstproamount,
        action: shoppingCartActions.ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT,
        done: false,
        error: null
      }
  )),

  on(shoppingCartActions.getlistProductsamountSuccess,
    (state, { lstproamount }) => ({
      ...state,
      selected: lstproamount,
      action: shoppingCartActions.ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS,
      done: true,
      error:
      null
  })),

  on(shoppingCartActions.getlistProductsamountError,
    (state, { err }) => ({
      ...state,
      done: true,
      selected: null,
      error: err
  })),

  // Send Data to components

  on(shoppingCartActions.sendDatacomponent,
    (state, { message, data }) => (
    {
        ...state,
        selected: { message , data},
        action: shoppingCartActions.ShoppingcartActionTypes.SEND_DATA_COMPONENT,
        done: false,
        error: null
      }
  )),
  on(shoppingCartActions.sendDatacomponentSuccess,
    (state, {response}) => (
      {
      ...state,
      selected: {
        message: response.message,
        data: response.data
      },
      action: shoppingCartActions.ShoppingcartActionTypes.SEND_DATA_COMPONENT_SUCCESS,
      done: true,
      error:
      null
    }
  )),
  on(shoppingCartActions.sendDatacomponentError,
    (state, { err }) => ({
      ...state,
      done: true,
      selected: null,
      error: err
  })),

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

export const getListShoppingCart = createSelector( getShoppingCartState , ( state: State ) => {
  if (state.action ===  shoppingCartActions.ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART && state.done && !state.error){
    return state.data;
  } else{
    return [];
  }
});

export const getListShoppingCartError = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART_ERROR
    ? state.error
   : null;
});


export const updateAmountOfProduct = createSelector( getShoppingCartState , ( state: State ) => {
  if (state.action ===  shoppingCartActions.ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});


export const updateAmountOfProductError = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_ERROR
    ? state.error
   : null;
});


export const getLastlistproducts = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS && state.data === 'lstproducts'
    ? state.data
   : null;
});

// Get list products with amount

export const getProductListAmount = createSelector( getShoppingCartState , ( state: State ) => {
  if (state.action ===  shoppingCartActions.ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});

export const getProductListAmountError = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_ERROR
    ? state.error
   : null;
});

// Get data sent

export const getDataSend = createSelector( getShoppingCartState , ( state: State ) => {
  if (state.action ===  shoppingCartActions.ShoppingcartActionTypes.SEND_DATA_COMPONENT_SUCCESS && state.done && !state.error){
    return state.selected;
  } else{
    return null;
  }
});


export const getDataSendError = createSelector(getShoppingCartState, (state: State) => {
  return state.action === shoppingCartActions.ShoppingcartActionTypes.SEND_DATA_COMPONENT_ERROR
    ? state.error
   : null;
});
