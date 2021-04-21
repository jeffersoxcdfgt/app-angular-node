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
}
