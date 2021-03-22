import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { User } from '../shared/user';
import { Observable , from } from 'rxjs';
import { tap , distinct , toArray} from 'rxjs/operators';
import  * as  loginActions from '../store/actions/login.actions';
import { getAllUsers , isLogged } from '../store/reducers/login.reducers';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {
  title = 'List Of users';
  users : Observable<User[]>;
  login : Observable<User>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
   this.login = this.store.select(isLogged);
    this.login.subscribe( data =>{
        console.log(data);
    });

  }

}
