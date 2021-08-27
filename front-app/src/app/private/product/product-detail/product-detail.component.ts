import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {  Observable  } from 'rxjs';
import { Product } from '../class/product';
import {  productGet } from '../store/actions/product.actions';
import { getProduct } from '../store/reducers/product.reducers';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Observable<Product>;

  constructor(private route: ActivatedRoute ,
              private store: Store<AppState>){
  }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
        this.store.dispatch(productGet(params.id));
    });

    this.product = this.store.select(getProduct);
    this.product.subscribe((data) => {
      if (data != null && data !== undefined){
      }
    });
  }

}
