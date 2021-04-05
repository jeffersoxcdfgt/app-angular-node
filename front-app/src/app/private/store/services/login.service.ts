import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable , of } from 'rxjs';
import { catchError , map} from 'rxjs/operators';
import { User } from '../../shared/user';
import { TraceService } from '../../../shared/utils/traceService';

interface Userlogged {
   stateIslogged: boolean;
   currentUser: string;
}

@Injectable()
export class UserService {
  protected URL = 'http://localhost:1337/login';

  constructor(private http: HttpClient , private traceService: TraceService){ }
  /**
   * Login user to app
   * @param data the object containing user information
   * @returns gets the response
   */
   public logIn(data: User): Observable<any>{
     let headers = new HttpHeaders();
     headers = headers.set('Content-Type', 'application/json; charset=utf-8');
     return this.http.post<User>(this.URL , data  , {headers })
     .pipe(
          map((userdata)=> { return { ...userdata, user:data['user'].email }}),
           catchError(err =>of({err}))
     );
   }
}
