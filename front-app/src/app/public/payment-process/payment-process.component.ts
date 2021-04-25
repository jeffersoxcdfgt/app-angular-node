import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { getListShoppingCart } from '../store/reducers/shopping-cart.reducers';

@Component({
  selector: 'app-payment-process',
  templateUrl: './payment-process.component.html',
  styleUrls: ['./payment-process.component.css']
})
export class PaymentProcessComponent implements OnInit {

  constructor(private store: Store<AppState>){
  }

  ngOnInit(): void {
      this.getListShoppingCart();
  }

  getListShoppingCart = () => {
      this.store.select(getListShoppingCart).subscribe((products: any) => {
        if (products.hasOwnProperty('products') && products.products.length > 0 ){
        }
      });
  }
}
