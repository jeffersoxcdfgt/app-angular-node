import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError  } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../../class/product';
import { ProductsActionTypes } from '../../store/actions/product.actions';

@Injectable()
export class ProductEffects {

  public loadProducts$ = createEffect(() => this.actions$.pipe(
    ofType(ProductsActionTypes.GET_PRODUCTS),
    mergeMap(() => this.productService.findAll()
      .pipe(
        map((productsl: Product[]) => (
          {
            type: ProductsActionTypes.GET_PRODUCTS_SUCCESS,
            products: productsl
          })),
         catchError(error => of({ type: ProductsActionTypes.GET_PRODUCTS_ERROR, err: error }))
      ))
    )
  );


  public createProduct$ = createEffect(() => this.actions$.pipe(
      ofType(ProductsActionTypes.CREATE_PRODUCT),
      mergeMap((product) => this.productService.insert(product)
        .pipe(
          map((productadd: Product) => ({ type: ProductsActionTypes.CREATE_PRODUCT_SUCCESS, product: productadd })),
            catchError(err => of({ type: ProductsActionTypes.CREATE_PRODUCT_ERROR, err }))
        ))
      )
    );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
