import { createAction, props } from '@ngrx/store';
import { Product } from '../../class/product';

export enum ProductsActionTypes {
  GET_PRODUCTS = '[All] Products',
  GET_PRODUCTS_SUCCESS = '[ALL] Products Success',
  GET_PRODUCTS_ERROR = '[All] Products Error',
  CREATE_PRODUCT = '[Create] Product',
  CREATE_PRODUCT_SUCCESS = '[Create] Product Sucess',
  CREATE_PRODUCT_ERROR = '[Create] Product Error',
  GET_PRODUCT = '[GET] Product',
  GET_PRODUCT_SUCCESS = '[GET] Product Succes',
  GET_PRODUCT_ERROR = '[GET] Product Error',
  UPDATE_PRODUCT = '[Update] Product',
  UPDATE_PRODUCT_SUCCESS = '[Update] Product Success',
  UPDATE_PRODUCT_ERROR = '[Update] Product Error',
}

// list Products

export const productsGetAll = createAction(ProductsActionTypes.GET_PRODUCTS);
export const productsGetAllSuccess = createAction(ProductsActionTypes.GET_PRODUCTS_SUCCESS, props<{products: Product[]}>());
export const productsGetAllError = createAction(ProductsActionTypes.GET_PRODUCTS_ERROR, props<{err: Error}>());

// Create product

export const productCreate = createAction(ProductsActionTypes.CREATE_PRODUCT, props<{product: Product} >());
export const productCreateSuccess = createAction(ProductsActionTypes.CREATE_PRODUCT_SUCCESS, props<{product: Product}>());
export const productCreateError = createAction(ProductsActionTypes.CREATE_PRODUCT_ERROR, props<{err: Error}>());


// Get Pruduct

export const productGet = createAction(ProductsActionTypes.GET_PRODUCT, props<{id: number}>());
export const productGetSuccess = createAction(ProductsActionTypes.GET_PRODUCTS_SUCCESS, props<{productdata: Product} >());
export const  productGetError = createAction(ProductsActionTypes.GET_PRODUCT_ERROR, props<{err: Error}>());


// Update Pruduct

export const productUpdate = createAction(ProductsActionTypes.UPDATE_PRODUCT, props<{productupdate: Product} >());
export const prodcutUpdateSuccess = createAction(ProductsActionTypes.UPDATE_PRODUCT_SUCCESS);
export const prodcutUpdateError = createAction(ProductsActionTypes.UPDATE_PRODUCT_ERROR, props<{err: Error}>());
