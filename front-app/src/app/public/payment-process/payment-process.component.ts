import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { getListShoppingCart } from '../store/reducers/shopping-cart.reducers';
import { Product } from '../../private/product/class/product';
import { from , Observable , BehaviorSubject, of } from 'rxjs';
import { distinct, toArray, map , scan , find , tap } from 'rxjs/operators';

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {

  products: Observable<Product[]>;
  p: any;
  totalprice: Observable<number>;
  dataInput: BehaviorSubject<any>;

  constructor(private store: Store<AppState>){
    this.dataInput = new BehaviorSubject<string>('');

  }

  ngOnInit(): void {
      this.getListShoppingCart();
      this.getInputQuantity();
  }

  getListShoppingCart = () => {
      this.store.select(getListShoppingCart).subscribe((products: any) => {
        if (products.hasOwnProperty('products') && products.products.length > 0 ){

         const myproducts: Product[] = products.products.map((currentpro) => currentpro.product)
                .sort((a, b) => (a.id > b.id) ? 1 : -1);

        // this.totalprice = from(myproducts).pipe(scan((acc, curr) => Number(acc) + Number(curr.price), 0))
         this.getTotalPrice(myproducts);

         this.products = from(myproducts).pipe(
              distinct(e => e.id ),
                 map((val) => {
                    return {
                      cost: val.cost,
                      createdAt: val.createdAt,
                      description: val.description,
                      id: val.id,
                      name: val.name,
                      picture: val.picture,
                      price: val.price,
                      updatedAt: val.updatedAt,
                      quantity: myproducts.filter((data) => data.id === val.id ).length
                    };
               }),
               toArray()
            );
        }
      });
  }


  getInputQuantity = () => {
   this.dataInput.pipe().subscribe((valswitf) => {
      if (valswitf !== ''){
        console.log('valor product', valswitf.qchnage);

        if (valswitf.qchnage === ''){
              alert('No allowed null or empty value');
              this.products = this.products.pipe(
                map((mypro) => {
                    const resval =  mypro.find((proc) =>  proc.id === valswitf.productchange.id );
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
                        quantity: resval.quantity,
                        updatedAt: resval.updatedAt
                      }
                    ]
                   .sort((a, b) => (a.id > b.id) ? 1 : -1);
                })
            );
          }
      }
    });
  }


  getTotalPrice = (myproducts: Product[]) => {
    this.totalprice = from(myproducts).pipe(scan((acc, curr) => Number(acc) + Number(curr.price), 0));
  }

}
