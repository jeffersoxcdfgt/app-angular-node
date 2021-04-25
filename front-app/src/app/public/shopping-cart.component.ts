import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../app.state';
import { productsGetAll } from '../private/product/store/actions/product.actions';
import { getProductsError } from '../private/product/store/reducers/product.reducers';
import { getProductInShoppingCart } from './store/reducers/shopping-cart.reducers';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  textCounter = 0;
  arrayProducts = [];

  constructor(private router: Router, private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.store.select(getProductsError).subscribe((error) => this.loadingError(error));
    this.store.dispatch(productsGetAll());
    this.getProductShoppingCart();
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
          this.arrayProducts.push(data.product);
          this.textCounter = this.arrayProducts.length;
        }
    });
  }
}
