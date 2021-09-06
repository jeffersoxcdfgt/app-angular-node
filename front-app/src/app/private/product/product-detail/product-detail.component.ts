import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {  Observable  } from 'rxjs';
import { Product } from '../class/product';
import {  productGet } from '../store/actions/product.actions';
import { getProduct } from '../store/reducers/product.reducers';
import { map } from 'rxjs/operators';

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
        this.store.dispatch(productGet({id: +params.id}));
    });

    this.product = this.store.select(getProduct).pipe(
          map((dataVal) => dataVal != null && dataVal !== undefined ? dataVal[0] : dataVal)
    );
  }

}
