import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , of } from 'rxjs';
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

}
