import { createAction, props } from '@ngrx/store';
import { Product } from '../../class/product';

export enum ProductsActionTypes {
  GET_PRODUCTS = '[All] Products',
  GET_PRODUCTS_SUCCESS = '[ALL] Products Success',
  GET_PRODUCTS_ERROR = '[All] Products Error',
  CREATE_PRODUCT = '[Create] Product',
  CREATE_PRODUCT_SUCCESS = '[Create] Product Sucess',
  CREATE_PRODUCT_ERROR = '[Create] Product Error',
}

// list Products

export const productsGetAll = createAction(ProductsActionTypes.GET_PRODUCTS);
export const productsGetAllSuccess = createAction(ProductsActionTypes.GET_PRODUCTS_SUCCESS, props<{products: Product[]}>());
export const productsGetAllError = createAction(ProductsActionTypes.GET_PRODUCTS_ERROR, props<{err: Error}>());

// Create product

export const productCreate = createAction(ProductsActionTypes.CREATE_PRODUCT, props<{product: Product} >());
export const productCreateSuccess = createAction(ProductsActionTypes.CREATE_PRODUCT_SUCCESS, props<{product: Product}>());
export const productCreateError = createAction(ProductsActionTypes.CREATE_PRODUCT_ERROR, props<{err: Error}>());
