import { createAction, props } from '@ngrx/store';
import { Product } from '../../../private/product/class/product';

export enum ShoppingcartActionTypes {
  ADD_PRODUCT_SHOPPING_CART = '[Add product shopping cart] Shopping cart',
  ADD_PRODUCT_SHOPPING_CART_SUCCESS = '[Add product shopping cart succes] Shopping cart success',
  ADD_PRODUCT_SHOPPING_CART_ERROR = '[Add product shopping cart error] Shopping cart error',
  GET_PRODUCTS_SHOPPING_CART = '[GET_PRODUCTS_SHOPPING_CART] List shopping cart',
  GET_PRODUCTS_SHOPPING_CART_SUCCESS = '[GET_PRODUCTS_SHOPPING_CART_SUCESS] List shopping cart success',
  GET_PRODUCTS_SHOPPING_CART_ERROR = '[GET_PRODUCTS_SHOPPING_CART_ERROR] List shopping cart error',
  UPDATE_PRODUCT_SHOPPING_CART = '[UPDATE_PRODUCT_SHOPPING_CART] Update amount of products',
  UPDATE_PRODUCT_SHOPPING_CART_SUCCESS = '[UPDATE_PRODUCT_SHOPPING_CART_SUCCESS] Update amount of products success',
  UPDATE_PRODUCT_SHOPPING_CART_ERROR = '[UPDATE_PRODUCT_SHOPPING_CART_ERROR] Update amount of products error',
  GET_LAST_LIST_PRODUCTS = '[Getlist products update ] return all producst amount update',
  GET_LAST_LIST_PRODUCTS_SUCCESS = '[Getlist products update success ] return all producst amount update success',
  GET_LAST_LIST_PRODUCTS_ERROR = '[Getlist products update error ] return all producst amount update error',
  GET_LIST_SWITCH_PRODUCT_AMOUNT  = '[GET_LIST_SWITCH_PRODUCT_AMOUNT] Get list all products with amount update ',
  GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS  = '[GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS] Get list all products with amount update success',
  GET_LIST_SWITCH_PRODUCT_AMOUNT_ERROR  = '[GET_LIST_SWITCH_PRODUCT_AMOUNT_ERROR] Get list all products with amount update error',
  SEND_DATA_COMPONENT  = '[SEND_DATA_COMPONENT] You can send data to other component',
  SEND_DATA_COMPONENT_SUCCESS  = '[SEND_DATA_COMPONENT_SUCCESS] You can send data to other component success',
  SEND_DATA_COMPONENT_ERROR  = '[SEND_DATA_COMPONENT_ERROR] You can send data to other component error',
}

// Add product to shopping cart

export const shoppingCartAdd = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART, props<{product: Product} >());
export const shoppingCartAddSuccess = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_SUCCESS, props<{product: Product}>());
export const shoppingCartAddError = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_ERROR, props<{err: Error}>());

// Get list products for shopping cart

export const getListShoppingCart = createAction(ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART, props<{products: Product[]} >());
export const getListShoppingCartSuccess = createAction(ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART_SUCCESS,
  props<{products: Product[]}>());
export const getListShoppingCartError = createAction(ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART_ERROR, props<{err: Error}>());

// Update amount of product

export const updateAmountOfproducts = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART, props<{
  amount: any,
  idpro?: any,
  quantity?: any
} >());
export const updateAmountOfproductsSuccess = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_SUCCESS,
  props<{amount: any}>());
export const updateAmountOfproductsError = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_ERROR, props<{err: Error}>());

// Return new list products

export const getListproductslast = createAction(ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS);
export const getListproductslastSuccess = createAction(ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS_SUCCESS);
export const getListproductslastError = createAction(ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS_ERROR, props<{err: Error}>());

// Return list products with amount

export const getlistProductsamount = createAction(ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT, props<{lstproamount: any} >());
export const getlistProductsamountSuccess = createAction(ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS,
  props<{lstproamount: any} >());
export const getlistProductsamountError = createAction(ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_ERROR, props<{err: Error}>());


// Senda data to other component

export const sendDatacomponent = createAction(ShoppingcartActionTypes.SEND_DATA_COMPONENT, props<{message: string , data?: any} >());
export const sendDatacomponentSuccess = createAction(ShoppingcartActionTypes.SEND_DATA_COMPONENT_SUCCESS  , props<{response: any} >());
export const sendDatacomponentError = createAction(ShoppingcartActionTypes.SEND_DATA_COMPONENT_ERROR, props<{err: Error}>());
