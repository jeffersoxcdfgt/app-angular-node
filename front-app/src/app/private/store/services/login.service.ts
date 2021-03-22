import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable , of, throwError } from 'rxjs';
import { tap , catchError} from 'rxjs/operators';
import { User } from '../../shared/user';
import { TraceService } from '../../../shared/utils/traceService';

@Injectable()
export class UserService {
  protected URL ='http://localhost:3000/api/user';
  protected LOGINURL ='http://localhost:1337/login';

  //localhost:1337/ping


  constructor(private http: HttpClient ,private traceService: TraceService){ }

  /**
   * Find all the elements
   * @returns gets the list of objects found
   */
  public findAll(params?): Observable<User[]>{
      return this.http.get<User[]>(this.URL , { params: params }).pipe(
          tap(_ => this.traceService.log('fetched users')),
          catchError(this.traceService.handleError<User[]>('findAll', []))
      )
  }

  /**
   * Insert the data
   * @param data the object containing the data to be inserted
   * @returns gets the response
   */
   public insert(data: User): Observable<any>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type','application/json; charset=utf-8');
     return this.http.post<User>(this.LOGINURL , data  ,{headers: headers })
     .pipe(
        tap((newUser:User) => this.traceService.log(`added user w/ id=${newUser.id}`)),
           catchError(err => {
               return   of({err:err})
           }
        )
     )
   }

   /**
    * Update specific object into DB
    * @param user the object to be updated
    * @returns gets the response
    */
   public update(user: User): Observable<User> {
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.put<User>(this.URL + '/' + user['user'].id, user['user'], {headers: headers}).pipe(
       tap(_ => this.traceService.log(`updated user id=${user['user'].id}`)),
      catchError(this.traceService.handleError<any>('update'))
     )
   }

   /**
    * Find an object by its identifier
    * @param id the object identifier
    * @returns gets the object found
    */
   public findById(id: any): Observable<User> {
     return this.http.get<User>(this.URL + '/' + id[0]).pipe(
       tap(_ => this.traceService.log(`fetched user id=${id[0]}`)),
       catchError(this.traceService.handleError<User>(`findById id=${id[0]}`))
     )
   }

   /**
    * Delete an object by its identifier field
    * @param id the object identifier
    * @returns gets the response
    */
   public delete(id): Observable<User> {
     return this.http.delete<User>(this.URL + '/' + id).pipe(
       tap(_ => this.traceService.log(`deleted user id=${id}`)),
       catchError(this.traceService.handleError<User>('delete'))
     )
   }
}
