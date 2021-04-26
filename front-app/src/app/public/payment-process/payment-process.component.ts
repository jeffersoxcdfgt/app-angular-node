import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { getListShoppingCart } from '../store/reducers/shopping-cart.reducers';
import { Product } from '../../private/product/class/product';
import { from , Observable} from 'rxjs';
import { distinct, toArray, map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {

  products: Observable<Product[]>;
  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void {
      this.getListShoppingCart();
  }

  getListShoppingCart = () => {
      this.store.select(getListShoppingCart).subscribe((products: any) => {
        if (products.hasOwnProperty('products') && products.products.length > 0 ){
         const myproducts: Product[] = products.products.map((currentpro) => currentpro.product);
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
}
