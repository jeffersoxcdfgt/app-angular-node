import { Injectable } from '@angular/core';
import { BehaviorSubject , combineLatest , of   } from 'rxjs';
import { cleanBlank , ifEmpty , ifChecked , validObs } from './validation';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ValidationLoginService {

  subEmail: BehaviorSubject<string>;
  obsEmail: any;

  subPassword: BehaviorSubject<string>;
  obsPassword: any;

  subTerms: BehaviorSubject<boolean>;
  obsTerms: any;

  click$: boolean;

  constructor(){ }


  initValidation(): void {
    this.subEmail = new BehaviorSubject<string>('');
    this.obsEmail =  of(true);

    this.subPassword = new BehaviorSubject<string>('');
    this.obsPassword =  of(true);

    this.subTerms = new BehaviorSubject<boolean>(false);
    this.obsTerms =  of(true);

  }

  inputEmail(str: string): void{
      this.subEmail.next(str);
      this.obsEmail = this.subEmail.pipe(
                cleanBlank,
                    ifEmpty);
  }

  inputPassword(str: string): void{
    this.subPassword.next(str);
    this.obsPassword = this.subPassword.pipe(
              cleanBlank,
                  ifEmpty);
 }

 inputTerms(checked: boolean): void{
   this.subTerms.next(checked);
   this.obsTerms = this.subTerms.pipe(ifChecked);
}


  ifGood(): boolean{
      this.click$ = false;
      this.obsEmail = this.subEmail.pipe(cleanBlank, ifEmpty);
      this.obsPassword = this.subPassword.pipe(cleanBlank, ifEmpty);
      this.obsTerms = this.subTerms.pipe(ifChecked);

      combineLatest(
        [this.obsEmail.pipe(validObs),
        this.obsPassword.pipe(validObs),
        this.obsTerms.pipe(validObs)]
      ).subscribe(() => this.click$ =  true );

      if (this.click$){
        return true;
      }
      return false;
  }

}
