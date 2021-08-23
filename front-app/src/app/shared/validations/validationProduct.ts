import { Injectable } from '@angular/core';
import { BehaviorSubject , of , combineLatest } from 'rxjs';
import {
  cleanBlank ,
  ifEmpty ,
  validObs ,
  nameLength ,
  descriptionLength,
  onlyNumber } from './validation';

@Injectable({ providedIn: 'root' })
export class ValidationProductService {

    subNameOfProduct: BehaviorSubject<string>;
    obsNameOfProduct: any;

    subNameLengthOfProduct: BehaviorSubject<string>;
    obsNameLengthOfProduct: any;

    subDescriptionOfProduct: BehaviorSubject<string>;
    obsDescriptionOfProduct: any;

    subDescriptionLengthOfProduct: BehaviorSubject<string>;
    obsDescriptionLengthOfProduct: any;

    subPriceOfProduct: BehaviorSubject<string>;
    obsPriceOfProduct: any;

    subOnlyNumberPriceOfProduct: BehaviorSubject<string>;
    obsOnlyNumberPriceOfProduct: any;

    subCostOfProduct: BehaviorSubject<string>;
    obsCostOfProduct: any;

    subOnlyNumberCostOfProduct: BehaviorSubject<string>;
    obsOnlyNUmberCostOfProduct: any;

    subImageOfProduct: BehaviorSubject<string>;
    obsImageOfProduct: any;

    click$: boolean;

    constructor(){ }

    initValidation(): void {

      this.subNameOfProduct = new BehaviorSubject<string>('');
      this.obsNameOfProduct =  of(true);

      this.subNameLengthOfProduct = new BehaviorSubject<string>('');
      this.obsNameLengthOfProduct = of(true);

      this.subDescriptionOfProduct = new BehaviorSubject<string>('');
      this.obsDescriptionOfProduct =  of(true);

      this.subDescriptionLengthOfProduct = new BehaviorSubject<string>('');
      this.obsDescriptionLengthOfProduct = of(true);

      this.subPriceOfProduct = new  BehaviorSubject<string>('');
      this.obsPriceOfProduct =  of(true);

      this.subOnlyNumberPriceOfProduct = new BehaviorSubject<string>('');
      this.obsOnlyNumberPriceOfProduct = of(true);

      this.subCostOfProduct = new BehaviorSubject<string>('');
      this.obsCostOfProduct = of(true);

      this.subOnlyNumberCostOfProduct = new  BehaviorSubject<string>('');
      this.obsOnlyNUmberCostOfProduct = of (true);

      this.subImageOfProduct = new BehaviorSubject<string>('');
      this.obsImageOfProduct = of(true);
    }

    inputNameOfProduct(str: string): void{
        this.subNameOfProduct.next(str);
        this.obsNameOfProduct = this.subNameOfProduct.pipe(
                  cleanBlank,
                      ifEmpty);
    }

    inputNameLengthOfProduct(str: string): void{
      this.subNameLengthOfProduct.next(str);
      this.obsNameLengthOfProduct = this.subNameLengthOfProduct.pipe(
        nameLength
        );
    }


    inputDescriptionOfProduct(str: string): void{
      this.subDescriptionOfProduct.next(str);
      this.obsDescriptionOfProduct = this.subDescriptionOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputDescriptionLengthOfProduct(str: string): void{
      this.subDescriptionLengthOfProduct.next(str);
      this.obsDescriptionLengthOfProduct = this.subDescriptionLengthOfProduct.pipe(
        descriptionLength
        );
    }


    inputPriceOfProduct(str: string): void{
      this.subPriceOfProduct.next(str);
      this.obsPriceOfProduct = this.subPriceOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputPriceOnlyNumberOfProduct(str: string): void{
      this.subOnlyNumberPriceOfProduct.next(str);
      this.obsOnlyNumberPriceOfProduct = this.subOnlyNumberPriceOfProduct.pipe(
        onlyNumber
         );
    }


    inputCostOfProduct(str: string): void{
      this.subCostOfProduct.next(str);
      this.obsCostOfProduct = this.subCostOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    inputCostOnlyNumberOfProduct(str: string): void{
      this.subOnlyNumberCostOfProduct.next(str);
      this.obsOnlyNUmberCostOfProduct = this.subOnlyNumberCostOfProduct.pipe(
        onlyNumber
        );
    }


    inputImageOfProduct(str: string): void{
      this.subImageOfProduct.next(str);
      this.obsImageOfProduct = this.subImageOfProduct.pipe(
                cleanBlank,
                    ifEmpty);
    }

    ifGood(): boolean{
        this.click$ = false;
        this.obsNameOfProduct = this.subNameOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsDescriptionOfProduct = this.subDescriptionOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsPriceOfProduct = this.subPriceOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsCostOfProduct = this.subCostOfProduct.pipe(cleanBlank, ifEmpty);
        this.obsImageOfProduct = this.subImageOfProduct.pipe(cleanBlank, ifEmpty);

        this.obsNameLengthOfProduct = this.subNameLengthOfProduct.pipe(nameLength);
        this.obsDescriptionOfProduct = this.subDescriptionOfProduct.pipe(descriptionLength);
        this.obsOnlyNumberPriceOfProduct = this.subOnlyNumberPriceOfProduct.pipe(onlyNumber);
        this.obsOnlyNUmberCostOfProduct = this.subOnlyNumberCostOfProduct.pipe(onlyNumber);

        combineLatest(
          [
            this.obsNameOfProduct.pipe(validObs),
            this.obsDescriptionOfProduct.pipe(validObs),
            this.obsPriceOfProduct.pipe(validObs),
            this.obsCostOfProduct.pipe(validObs),
            this.obsImageOfProduct.pipe(validObs),
            this.obsNameLengthOfProduct.pipe(validObs),
            this.obsDescriptionOfProduct.pipe(validObs),
            this.obsOnlyNumberPriceOfProduct.pipe(validObs),
            this.obsOnlyNUmberCostOfProduct.pipe(validObs)
          ]
          ).subscribe(() => this.click$ =  true );

        if (this.click$){
            return true;
          }
        return false;
      }

}
