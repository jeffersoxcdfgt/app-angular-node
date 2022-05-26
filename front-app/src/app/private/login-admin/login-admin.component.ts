import { Component , OnDestroy, OnInit , ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loginUser } from '../store/actions/login.actions';
import { erroLogging } from '../store/reducers/login.reducers';
import { User } from '../shared/user';
import { ValidationLoginService } from '../../shared/validations/validationLogin';
import { BehaviorSubject , combineLatest, Observable } from 'rxjs';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { map } from 'rxjs/operators';

class Error {
  messageError: string;
  status: string;
}

const MAPERRO = map((errorcustom) => Object.assign(new Error(), errorcustom).messageError);

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit , OnDestroy{

  subgetEmail: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetEmail: any;

  subgetPassword: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetPassword: any;

  email = '';
  password = '';
  obsMessage$: Observable<string> = new Observable<string>();

  constructor(
    private store: Store<AppState>,
    public validationLoginService: ValidationLoginService
    ){
        this.obsgetEmail = this.subgetEmail;
        this.obsgetPassword = this.subgetPassword;
        this.getDatainputs$();
    }

    ngOnInit(): void{
      this.validationLoginService.initValidation();
      this.obsMessage$ = this.store.select(erroLogging).pipe(MAPERRO);
    }

    getDatainputs$ = () => combineLatest([this.obsgetEmail , this.obsgetPassword])
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

    ngOnDestroy(): void {
      this.getDatainputs$().unsubscribe();
    }

}
