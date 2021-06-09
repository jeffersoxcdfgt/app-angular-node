import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { productsGetAll  } from '../private/product/store/actions/product.actions';
import { getProductsError } from '../private/product/store/reducers/product.reducers';
import { getProductInShoppingCart , updateAmountOfProduct} from './store/reducers/shopping-cart.reducers';
import { getListShoppingCart } from './store/actions/shopping-cart.actions';
import { Product } from '../private/product/class/product';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  textCounter = 0;
  arrayProducts  = [];

  constructor(private router: Router, private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.store.select(getProductsError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(productsGetAll());
    this.getProductShoppingCart();
    this.upateAmountOfProduct();
  }

  /*
   * Display error message if load of products fails
   */
  loadingError(error): void {
    if (error) {
      alert('Error while loading the list of products');
     }
  }

  goUser = () => this.router.navigate(['/user']);

  getProductShoppingCart(): void {
    this.store.select(getProductInShoppingCart).subscribe((data: any) => {
        if (data != null){
          this.arrayProducts = Object.assign([], this.arrayProducts);
          this.arrayProducts.push(data);
          this.textCounter = this.arrayProducts.length;
        }
    });
  }

  getListShoppingCart  = () => {
     this.store.dispatch(getListShoppingCart({
       products: this.arrayProducts
     }));
  }

  upateAmountOfProduct = () => {
    this.store.select(updateAmountOfProduct).subscribe((amount: any) => {
      if (amount != null &&  amount.hasOwnProperty('amount')){
          this.textCounter = Number(amount.amount);
      }


      if (amount != null &&  amount.hasOwnProperty('idpro') &&
          amount.hasOwnProperty('quantity')){
          const  prochange = this.arrayProducts.find((valfilter) => valfilter.product.id === amount.idpro );
          const arraych  = this.arrayProducts.filter((valfilter) => valfilter.product.id !== amount.idpro );
          const valuearray = this.fillArray(prochange, amount.quantity);
          this.arrayProducts = arraych.concat(valuearray);

     }
     else if (amount != null &&  amount.hasOwnProperty('idpro')){
        this.arrayProducts = this.arrayProducts.filter((valfilter) => valfilter.product.id !== amount.idpro );

     }
  });

  }

   fillArray = (value, len)  => {
    if (len === 0) { return []; }
    let a = [value];
    while (a.length * 2 <= len) { a = a.concat(a); }
    if (a.length < len) { a = a.concat(a.slice(0, len - a.length)); }
    return a;
  }


}
