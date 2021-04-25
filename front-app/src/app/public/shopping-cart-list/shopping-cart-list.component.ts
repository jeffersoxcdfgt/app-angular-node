import { Component, OnInit , Input , Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Product } from '../../private/product/class/product';
import { Observable } from 'rxjs';
import { getAllProducts } from '../../private/product/store/reducers/product.reducers';
import { shoppingCartAdd } from '../store/actions/shopping-cart.actions';
import { getProductInShoppingCartError } from '../store/reducers/shopping-cart.reducers';


@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  p: any;
  products: Observable<Product[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products = this.store.select(getAllProducts);
    this.store.select(getProductInShoppingCartError).subscribe((error) => this.loadingError(error));
  }

  addCart = (product: Product ) => this.store.dispatch(shoppingCartAdd({product}));

  /*
   * Display error message if load of products fails
   */
     loadingError(error): void{
      if (error) {
        alert('Error while loading the list of shopping cart');
      }
    }
}
