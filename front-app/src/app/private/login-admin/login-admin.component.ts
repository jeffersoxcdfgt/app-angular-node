import { Component , OnInit , AfterViewInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { loginUser } from '../store/actions/login.actions';
import { erroLogging } from '../store/reducers/login.reducers';
import { User } from '../shared/user';
import { ValidationLoginService } from '../../shared/validations/validationLogin';
import { BehaviorSubject , of   } from 'rxjs';

class Error {
  messageError: string;
  status: string;
}


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  messageValidation : string = '';
  showAlert : string = 'none';

  constructor(
    private store: Store<AppState>,
    public validationLoginService:ValidationLoginService
    ){}

    ngOnInit(): void{
      this.validationLoginService.initValidation();
      this.loginError();
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
          this.messageValidation = erromessage.messageError
          this.showAlert = 'block'
        }
      });
    }
  
    close = () => this.showAlert  = 'none'
}
