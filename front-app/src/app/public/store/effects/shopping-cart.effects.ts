import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType} from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ShoppingcartService } from '../services/shopping-cart.service';
import { Product } from '../../../private/product/class/product';
import { ShoppingcartActionTypes } from '../actions/shopping-cart.actions';

@Injectable()
export class ShoppingcartEffects {

  public addProductShoppingCart$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART),
    mergeMap((product) => this.shoppingcartService.addProductToShoppingcart(product)
      .pipe(
        map((productnew: Product) => ({
          type: ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_SUCCESS,
          product: productnew
        })),
          catchError(error => of({
            type: ShoppingcartActionTypes.ADD_PRODUCT_SHOPPING_CART_ERROR,
            err: error
          }))
      ))
    )
  );

  public getListShoppingCart$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART),
    mergeMap((productslstnew) => this.shoppingcartService.getListProductToShoppingcart(productslstnew)
      .pipe(
        map((productslst: Product[]) => ({
          type: ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART_SUCCESS,
          products: productslst
        })),
          catchError(error => of({
            type: ShoppingcartActionTypes.GET_PRODUCTS_SHOPPING_CART_ERROR,
            err: error
          }))
      ))
    )
  );

  public updateAmountOfProduct = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART),
    mergeMap((amount) => this.shoppingcartService.updateAmountproducts(amount)
      .pipe(
        map((amountnew: any) => ({
          type: ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_SUCCESS,
          amount: amountnew
        })),
          catchError(error => of({
            type: ShoppingcartActionTypes.UPDATE_PRODUCT_SHOPPING_CART_ERROR,
            err: error
          }))
      ))
    )
  );


  public callParentComponent$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS),
    mergeMap(() => this.shoppingcartService.callinService()
      .pipe(
        map((_) => ({ type: ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS_SUCCESS })),
         catchError(errcross => of({ type: ShoppingcartActionTypes.GET_LAST_LIST_PRODUCTS_ERROR, err: errcross }))
      ))
    )
  );

  public getListAmountProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT),
    mergeMap((dataproductsamount) => this.shoppingcartService.getlistamountproducts(dataproductsamount)
      .pipe(
        map((amountproducts: any) => ({
          type: ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_SUCCESS,
          lstproamount: amountproducts
        })),
          catchError(error => of({
            type: ShoppingcartActionTypes.GET_LIST_SWITCH_PRODUCT_AMOUNT_ERROR,
            err: error
          }))
      ))
    )
  );


  public sendData$ = createEffect(() => this.actions$.pipe(
    ofType(ShoppingcartActionTypes.SEND_DATA_COMPONENT),
    mergeMap((data) => this.shoppingcartService.senData(data)
      .pipe(
        map((reponsedata: any) => ({
          type: ShoppingcartActionTypes.SEND_DATA_COMPONENT_SUCCESS,
          response: reponsedata
        })),
          catchError(error => of({
            type: ShoppingcartActionTypes.SEND_DATA_COMPONENT_ERROR,
            err: error
          }))
      ))
    )
  );


  constructor(
    private actions$: Actions,
    private shoppingcartService: ShoppingcartService
  ) {}
}
