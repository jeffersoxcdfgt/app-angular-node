import { Injectable } from '@angular/core';
import { BehaviorSubject , of , combineLatest } from 'rxjs';
import { cleanBlank , ifEmpty , validObs , onlyNumberCard } from './validation';


@Injectable({ providedIn: 'root' })
export class ValidationPaymentService {

  subNameOfCard: BehaviorSubject<string>;
  obsNameOfCard: any;

  subCardNumber: BehaviorSubject<string>;
  obsCardNumber: any;

  subCardOnlyNumber: BehaviorSubject<string>;
  obsCardOnlyNumber: any;

  subSecurityCode: BehaviorSubject<string>;
  obsSecurityCode: any;

  click$: boolean;

  constructor(){ }


  initValidation(): void {

    this.subNameOfCard = new BehaviorSubject<string>('');
    this.obsNameOfCard =  of(true);

    this.subCardNumber = new BehaviorSubject<string>('');
    this.obsCardNumber =  of(true);

    this.subCardOnlyNumber = new BehaviorSubject<string>('');
    this.obsCardOnlyNumber =  of(true);

    this.subSecurityCode = new BehaviorSubject<string>('');
    this.obsSecurityCode =  of(true);
  }

  inputNameOfCard(str: string): void{
    this.subNameOfCard.next(str);
    this.obsNameOfCard = this.subNameOfCard.pipe(
              cleanBlank,
                  ifEmpty);
  }

  inputCardNumber(str: string): void{
    this.subCardNumber.next(str);
    this.obsCardNumber = this.subCardNumber.pipe(
              cleanBlank,
                  ifEmpty);
  }

  inputCardOnlyNumber(str: string): void {
    this.subCardOnlyNumber.next(str);
    this.obsCardOnlyNumber = this.subCardOnlyNumber.pipe(
            onlyNumberCard
    );
  }

  inputSecurityCode(str: string): void{
    this.subSecurityCode.next(str);
    this.obsSecurityCode = this.subSecurityCode.pipe(
              cleanBlank,
                  ifEmpty);
  }


  ifGood(): boolean{
    this.click$ = false;
    this.obsNameOfCard = this.subNameOfCard.pipe(cleanBlank, ifEmpty);
    this.obsCardNumber = this.subCardNumber.pipe(cleanBlank, ifEmpty);
    this.obsCardOnlyNumber = this.subCardOnlyNumber.pipe(onlyNumberCard);
    this.obsSecurityCode = this.subSecurityCode.pipe(cleanBlank, ifEmpty);

    combineLatest(
        [this.obsNameOfCard.pipe(validObs),
        this.obsCardNumber.pipe(validObs),
        this.obsCardOnlyNumber.pipe(validObs),
        this.obsSecurityCode.pipe(validObs)]
      ).subscribe(() => this.click$ =  true );

    if (this.click$){
        return true;
      }
    return false;
  }

}
