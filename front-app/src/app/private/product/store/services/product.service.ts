import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { Product } from '../../class/product';
import { TraceService } from '../../../../shared/utils/traceService';
import { environment } from '../../../../../environments/environment';


@Injectable()
export class ProductService {
  protected URL = environment.urlapi;
  constructor(private http: HttpClient , private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(): Observable<Product[]>{
      return this.http.get<Product[]>(`${this.URL}/api/products/list`).pipe(
          tap(_ => this.traceService.log('fetched products')),
          catchError(this.traceService.handleError<Product[]>('findAll', []))
      );
  }


 /**
  * Insert the data
  * @param data the object containing the data to be inserted
  * @returns gets the response
  */
     public insert(data: any): Observable<Product>{
      let headers = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json; charset=utf-8');
      return this.http.post<Product>(`${this.URL}/api/products/create` , data.product, {headers })
      .pipe(
         tap((newProduct: Product) => this.traceService.log(`added product w/ id=${newProduct.id}`)),
         catchError(this.traceService.handleError<Product>('insert'))
      );
  }

}
