import { Component, OnInit , ViewChild , ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { getListShoppingCart , getProductListAmount  } from '../store/reducers/shopping-cart.reducers';
import { Product } from '../../private/product/class/product';
import { from , Observable , BehaviorSubject , combineLatest , concat , of, merge} from 'rxjs';
import { distinct, toArray, map , scan , filter , tap , mergeMap, mapTo} from 'rxjs/operators';
import { MessageBoxComponent } from '../../shared/components/message-box/message-box.component';
import { updateAmountOfproducts, getListproductslast } from '../store/actions/shopping-cart.actions';
import { ValidationPaymentService } from '../../shared/validations/validationPayment';
import {PaymentTransaction} from './class/paymentTransaction';


const NUMINPUTS = 3;

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {

  products: Observable<Product[]>;
  p: any;
  totalprice: number;
  totalpriceaux: number;
  dataInput: BehaviorSubject<any>;
  messageValidation = '';
  @ViewChild('messageBoxComponent') messageBoxComponent: MessageBoxComponent;
  valuesInputs = [];
  proquantityval: Product[];
  valuesModeldata = [];

  subgetCreditNumber: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetCreditNumber: any;
  valueInputcard = '';

  // get values inputs

  subgetMynamecard: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetMynamecard: any;

  subgetMynumbercard: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetMynumbercard: any;

  subgetSecurityCode: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetSecurityCode: any;

  subgetDay: BehaviorSubject<string> = new BehaviorSubject<string>('01');
  obsgetDay: any;

  subgetMonth: BehaviorSubject<string> = new BehaviorSubject<string>('1');
  obsgetMonth: any;

  subgetYear: BehaviorSubject<string> = new BehaviorSubject<string>('2020');
  obsgetYear: any;

  dataPayment = of();

  // get values inputs


  constructor(private store: Store<AppState>,
              private el: ElementRef,
              private validationPaymentService: ValidationPaymentService){
    this.dataInput = new BehaviorSubject<string>('');
    this.validationPaymentService.initValidation();

    this.obsgetMynamecard = this.subgetMynamecard;
    this.obsgetMynumbercard = this.subgetMynumbercard;
    this.obsgetSecurityCode = this.subgetSecurityCode;
    this.obsgetDay = this.subgetDay;
    this.obsgetMonth = this.subgetMonth;
    this.obsgetYear = this.subgetYear;
  }


  ngOnInit(): void {
     this.getListShoppingCart();
     this.getInputQuantity();
     this.getDatainputs();
  }

  addStr = (str, index, stringToAdd) => {
    return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
  }


  getDatainputs = () => {
    this.obsgetCreditNumber = this.subgetCreditNumber
         .pipe(map((dataInput) =>  dataInput))
          .subscribe((input) => {
            this.valueInputcard = input;
    });

     // Get data all inputs
    this.dataPayment = combineLatest([
      this.obsgetMynamecard ,
      this.obsgetMynumbercard,
      this.obsgetSecurityCode,
      this.obsgetDay,
      this.obsgetMonth,
      this.obsgetYear
    ]
   )
   .pipe(
         filter((filterdata) => filterdata.filter((dataFil) => dataFil !== '').length >= NUMINPUTS),
           map((
             [nameCard,
              numCard,
              securitycode,
              daycard,
              monthcard,
              yearcard
            ])  =>  ({ nameCard, numCard, securitycode, daycard, monthcard, yearcard }))
        );
    // Get data all inputs

    }

  getListShoppingCart = () => {
      this.store.select(getListShoppingCart).subscribe((products: any) => {
        if (products.hasOwnProperty('products') && products.products.length > 0 ){
         const myproducts: Product[] = products.products.map((currentpro) => currentpro.product)
                .sort((a, b) => (a.id > b.id) ? 1 : -1);

         this.products = from(myproducts).pipe(
              distinct(e => e.id ),
                 map((val, i) => {
                    return {
                      cost: val.cost,
                      createdAt: val.createdAt,
                      description: val.description,
                      id: val.id,
                      name: val.name,
                      picture: val.picture,
                      price: val.price,
                      updatedAt: val.updatedAt,
                      quantity: myproducts.filter((data) => data.id === val.id ).length,
                      idproc: i
                    };
               }),
               toArray());

         const proquantity = this.products;
         proquantity.subscribe((myproval) => {
                this.proquantityval = myproval;
                this.getTotalPrice(myproval);
                this.valuesInputs = myproval.map((valp) => {
                      return {
                        id: valp.id,
                        quantity: valp.quantity,
                        price: valp.price
                      };
                });
              });
           }
      });
  }


  getInputQuantity = () => {
   this.dataInput.pipe().subscribe((valswitf) => {
      if (valswitf !== ''){
          if (valswitf.qchnage === ''){
            this.messageValidation = 'No allowed null or empty value';
            this.messageBoxComponent.open();
          }
          else if (!/^\d+$/.test(valswitf.qchnage)){
            this.messageValidation = 'Only numbers and integers';
            this.messageBoxComponent.open();
          }
          else if (Number(valswitf.qchnage) <= 0){
            this.messageValidation = 'Only values hight than zero';
            this.messageBoxComponent.open();
          }

          this.products.pipe(
              map((mypro, i) => {
                      const resval = mypro.find((proc) =>  proc.id === valswitf.productchange.id);
                      let qt = valswitf.qchnage !== '' ? valswitf.qchnage : resval.quantity;
                      qt = !/^\d+$/.test(qt) ? resval.quantity : qt;
                      qt = qt <= 0 ? resval.quantity : qt;

                      return [
                        ...mypro.filter((cupro) => cupro.id !== valswitf.productchange.id ),
                        {
                          cost: resval.cost,
                          createdAt: resval.createdAt,
                          description: resval.description,
                          id: resval.id,
                          name: resval.name,
                          picture: resval.picture,
                          price: resval.price,
                          quantity: qt,
                          updatedAt: resval.updatedAt,
                          idproc: resval.idproc
                        }
                      ]
                    .sort((a, b) => (a.id > b.id) ? 1 : -1);
            })
          );
        }
    });
  }


  getTotalPrice = (myproducts: Product[]) => {
     from(myproducts).pipe(scan((acc, curr) =>
          Number(acc) + (Number(curr.price) * Number(curr.quantity)) , 0)).subscribe((total) => {
            this.totalprice = total;
      });
  }

  viewToModelUpdate( id: number , product: Product): void {
    const index = this.valuesInputs.findIndex((valsearch) => valsearch.id === id);
    if (this.valuesInputs[index].quantity === ''){
       const myvd =  this.valuesModeldata.filter((ele) => ele.id === id);
       if (myvd !== undefined && myvd.length > 0){
        this.valuesInputs[index].quantity = myvd[myvd.length - 1 ].quantity;
       }
       else {
        this.valuesInputs[index].quantity = product.quantity;
       }
    }
    else if (!/^\d+$/.test(this.valuesInputs[index].quantity)){
        let valuech = this.valuesInputs[index].quantity.replace(/\D/g, '');
        const myvd =  this.valuesModeldata.filter((ele) => ele.id === id);
        if (valuech === ''){
          if (myvd !== undefined && myvd.length > 0){
            valuech = myvd[myvd.length - 1 ].quantity;
           }
           else {
            valuech = product.quantity;
           }
        }
        this.valuesInputs[index].quantity = valuech;
    }
    else if (Number(this.valuesInputs[index].quantity) <= 0 ){
      const myvd =  this.valuesModeldata.filter((ele) => ele.id === id);
      if (myvd !== undefined && myvd.length > 0){
       this.valuesInputs[index].quantity = myvd[myvd.length - 1 ].quantity;
      }
      else {
       this.valuesInputs[index].quantity = product.quantity;
      }
    }
  }

  changeModel = (event, id: number , price: number) => {
    if (event !== '' && /^\d+$/.test(event) && Number(event) > 0 ){
       this.valuesModeldata.push({
          id,
          quantity: event,
          price
        });
       this.totalprice = 0;
       let qtotal  = 0;
       this.valuesInputs.forEach((val) => {
          const tot = Number(val.quantity) * Number(val.price);
          qtotal = qtotal + Number(val.quantity);
          this.store.dispatch(updateAmountOfproducts({
            amount: qtotal,
            idpro: id,
            quantity: event
          }));
          this.totalprice = this.totalprice + tot;
          this.totalpriceaux = this.totalprice ;
        });
    }
    else {
      this.totalpriceaux = this.totalprice;
   }
  }


  updateAmountDelete = (id: number) => {
      const lstvalues = this.valuesInputs.filter((filtervalue) => filtervalue.id !== id);
      const indexarray = this.valuesInputs.findIndex((filtervalue) => filtervalue.id  === id);
      let qtotalq = 0;
      let total = 0;
      lstvalues.forEach((valpro) => {
          const totamount = Number(valpro.quantity) * Number(valpro.price);
          qtotalq = qtotalq + Number(valpro.quantity);
          this.store.dispatch(updateAmountOfproducts({
            amount: qtotalq,
            idpro: id
          }));
          total = total + totamount;
      });

      this.products.pipe(
             map((valpro) => valpro.filter((valfil) => valfil.id !== id)),
              ).subscribe((valpfil) => {
              this.products = from([valpfil]);
      });

      this.totalprice = total;
      this.valuesInputs[indexarray].quantity = 0;

  }

  payNow = () => {
    if (this.validationPaymentService.ifGood()){
        const lstpro = [{
         idpro: 1,
         nameproduct: 'produc1'
        },
        {
          idpro: 2,
          nameproduct: 'produc2'
         }
       ];

        const obs = of([
        {
          idpro: 1,
          nameproduct: 'produc1'
         },
         {
           idpro: 2,
           nameproduct: 'produc2'
          }
       ]);

        /*this.dataPayment.pipe(
            map(({nameCard, numCard, securitycode, daycard, monthcard, yearcard})  =>  (
              {
                nameCard,
                numCard,
                securitycode, daycard,
                monthcard,
                yearcard,
                products: [{
                   ...lstpro
                 }
               ]
              }
            ))
          ).subscribe((m) => console.log(m, 'transation product'));*/

        this.store.dispatch((getListproductslast()));

        this.dataPayment
                .pipe(mergeMap((data: PaymentTransaction) => obs.pipe(
                  map((lstmyproducts) => ({
                        ...data,
                        products: [
                          ...lstmyproducts
                        ]
                      })
                   )
        )));

        this.store.select(getProductListAmount).subscribe((amountdata: any) => {
          if (amountdata !== null && amountdata.hasOwnProperty('lstproamount')){
              amountdata.lstproamount.subscribe((obssent) => {
                    console.log(obssent, 'Observable sent from dispatcher, Not only data , It\'s possible WOOWW');
              });
          }
        });
     }
  }

}
