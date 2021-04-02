import { Component , OnInit , AfterViewInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loginUser } from '../store/actions/login.actions';
import { erroLogging } from '../store/reducers/login.reducers';
import { User } from '../shared/user';
import { ValidationLoginService } from '../../shared/validations/validationLogin';
import { BehaviorSubject , combineLatest } from 'rxjs';

class Error {
  messageError: string;
  status: string;
}

////


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  messageValidation = '';
  showAlert = 'none';

  subgetEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetEmail: any;

  subgetPassword: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetPassword: any;

  email = '';
  password = '';

  constructor(
    private store: Store<AppState>,
    public validationLoginService: ValidationLoginService
    ){
        this.obsgetEmail = this.subgetEmail;
        this.obsgetPassword = this.subgetPassword;
        this.getDatainputs();
    }

    ngOnInit(): void{
      this.validationLoginService.initValidation();
      this.loginError();
    }

    getDatainputs = () => combineLatest([this.obsgetEmail , this.obsgetPassword])
      .subscribe(([email, password]) => {
        this.email = email.toString();
        this.password = password.toString();
    })

    login(): void {
        if (this.validationLoginService.ifGood()){
          const user: User  = {
            email: this.email,
            password: this.password
          };
          this.store.dispatch(loginUser({user}));
        }
    }

    loginError(): void {
      this.store.select(erroLogging).subscribe((error) => {
        if (error !== null){
          const erromessage = Object.assign(new Error(), error);
          this.messageValidation = erromessage.messageError;
          this.showAlert = 'block';
        }
      });
    }

    close = () => this.showAlert  = 'none';
}
