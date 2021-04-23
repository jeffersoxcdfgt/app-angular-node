import { Component, OnInit , Input , Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Product } from '../../private/product/class/product';
import { Observable } from 'rxjs';
import { getAllProducts } from '../../private/product/store/reducers/product.reducers';
import { filter, tap , map } from 'rxjs/operators';

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
  }

}
