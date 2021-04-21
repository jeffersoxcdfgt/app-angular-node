import { createAction, props } from '@ngrx/store';
import { Product } from '../../class/product';

export enum ProductsActionTypes {
  GET_PRODUCTS = '[All] Products',
  GET_PRODUCTS_SUCCESS = '[ALL] Products Success',
  GET_PRODUCTS_ERROR = '[All] Products Error'
}

// list Products

export const productsGetAll = createAction(ProductsActionTypes.GET_PRODUCTS);
export const productsGetAllSuccess = createAction(ProductsActionTypes.GET_PRODUCTS_SUCCESS, props<{products: Product[]}>());
export const productsGetAllError = createAction(ProductsActionTypes.GET_PRODUCTS_ERROR, props<{err: Error}>());
