import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { AppState } from '../app.state';
import { userGetAll , userCreate ,  } from './store/actions/login.actions';
import {
  getUsersError ,
  isLogged ,
  getCreateError ,
  isUpdated ,
  getUpdateError ,
  isDeleted,
  getUserError,
  getDeleteError
} from './store/reducers/login.reducers';
import { User } from  './shared/user';
import { tap } from 'rxjs/operators';
import { Observable , from } from 'rxjs';


@Component({
  selector:'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,private store :Store<AppState>){
  }

  ngOnInit(){
      this.loginError()
  }

  /**
   * Display error message if load fails
   */
  loadingError(error) {
  
  }

  /**
   * Display success message after execute specific action 
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
  actionSuccess(done: boolean, message: string): void {
    if (done) {
      alert(message);
    }
  }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
  actionError(error, message: string): void {
    if (error) {
      alert(message);
    }
  }

  login() : void {
      const user:User = {
        email:'test@test.com1212',
        password:'1234'
      }
      this.store.dispatch(userCreate({user}));
  }

  loginError(): void {  
    this.store.select(getCreateError).subscribe( error =>{
      if(error !== null){
        alert( error['messageError'])
      }
    });
  }
}
