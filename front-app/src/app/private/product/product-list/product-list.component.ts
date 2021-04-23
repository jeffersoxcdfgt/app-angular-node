import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Product } from '../class/product';
import { Observable } from 'rxjs';
import { getAllProducts } from '../store/reducers/product.reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  p: any;
  products: Observable<Product[]>;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products = this.store.select(getAllProducts);
    this.products.subscribe( data => {
      if (data.length > 0){
        // console.log(data,"private")
      }
    });
  }
}
