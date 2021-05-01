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

export const updateAmountOfproducts = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART, props<{amount: any} >());
export const updateAmountOfproductsSuccess = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_SUCCESS,
  props<{amount: any}>());
export const updateAmountOfproductsError = createAction(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_ERROR, props<{err: Error}>());

