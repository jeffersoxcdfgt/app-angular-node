import { Component , OnInit , AfterViewInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { loginUser } from './store/actions/login.actions';
import { erroLogging , userisLogged } from './store/reducers/login.reducers';
import { User } from './shared/user';
import { ValidationLoginService } from '../shared/validations/validationLogin';
import { BehaviorSubject , of   } from 'rxjs';

class Error {
  messageError: string;
  status: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit  , AfterViewInit{

  subAdmin:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  obsAdmin:any = of(false);
  currentuser: string;
  messageValidation : string = 'Error credentials user';


  constructor(
    private router: Router, 
    private store: Store<AppState>,
    public validationLoginService:ValidationLoginService
    ){}

  ngOnInit(): void{
      this.validationLoginService.initValidation();
      this.loginError();
  }

  ngAfterViewInit() : void {
    this.store.select(userisLogged).subscribe((isLogged) => {
      setTimeout(() => {       
        if(isLogged !== null){          
          this.subAdmin.next(isLogged)
          this.obsAdmin = this.subAdmin.pipe()
          this.currentuser = isLogged.currentUser.user
        }
       })   
    });
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

  login(): void {
      if(this.validationLoginService.ifGood()){
          const user: User = {
            email: 'test@test.com',
            password: '1234'
          };
          this.store.dispatch(loginUser({user}));
      }
  }

  loginError(): void {
    this.store.select(erroLogging).subscribe((error) => {
      if (error !== null){
        const erromessage = Object.assign(new Error(), error);
        alert(erromessage.messageError);
      }
    });
  }
}
