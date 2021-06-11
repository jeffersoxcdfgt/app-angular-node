import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of , EMPTY } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { Product } from '../../../private/product/class/product';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class ShoppingcartService {

  constructor(private http: HttpClient , private traceService: TraceService){ }

  /**
   * Increase counter products
   * @param data the object containing the data from product
   * @returns gets the response
   */
   public addProductToShoppingcart(data: Product): Observable<Product>{

    return of<Product>(data)
      .pipe(
          tap((_) => this.traceService.log(`added product to shopping-cart`)),
                catchError(this.traceService.handleError<Product>('addProductToShoppingcart'))
      );
   }


  /**
   * Get list products for shopping cart
   * @param data the list object from products
   * @returns gets the response
   */
   public getListProductToShoppingcart(products: Product[]): Observable<Product[]>{
      return of<Product[]>(products)
          .pipe(
              tap((_) => this.traceService.log(`list products for shopping cart`)),
                    catchError(this.traceService.handleError<Product[]>('getListProductToShoppingcart'))
          );
    }


  /**
   * update counter product
   * @param data new number of products
   * @returns gets the response
   */
   public updateAmountproducts(data: any): Observable<any>{
    return of<any>(data)
      .pipe(
          tap((_) => this.traceService.log(`update amount of products`)),
                catchError(this.traceService.handleError<any>('updateAmountproducts'))
      );
   }

  /**
   * Calling parent component
   * @returns gets the response
   */
   public callinService(): Observable<any>{
          return of();
   }

  /**
   * return list products with amount and group-by
   * @returns gets the response  with all inform
   */
      public getlistamountproducts(data: any): Observable<any>{
        return of<any>(data)
          .pipe(
              tap((_) => this.traceService.log(`list products with amount update`)),
                    catchError(this.traceService.handleError<any>('getlistamountproducts'))
          );
       }

}
