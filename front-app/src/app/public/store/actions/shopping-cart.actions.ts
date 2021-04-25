import { createAction, props } from '@ngrx/store';
import { Product } from '../../../private/product/class/product';

export enum ShoppingcartActionTypes {
  ADD_PRODUCT_SHOPPING_CART = '[Add product shopping cart] Shopping cart',
  ADD_PRODUCT_SHOPPING_CART_SUCCESS = '[Add product shopping cart succes] Shopping cart succes',
  ADD_PRODUCT_SHOPPING_CART_ERROR = '[Add product shopping cart error] Shopping cart error',

}

// Add product to shopping cart

export const shoppingCartAdd = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART, props<{product: Product} >());
export const shoppingCartAddSuccess = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_SUCCESS, props<{product: Product}>());
export const shoppingCartAddError = createAction(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_ERROR, props<{err: Error}>());


