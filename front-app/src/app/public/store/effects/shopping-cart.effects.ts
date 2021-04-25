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


  constructor(
    private actions$: Actions,
    private shoppingcartService: ShoppingcartService
  ) {}
}
