import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, find, map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { Product } from '../class/product';
import { productGet } from '../store/actions/product.actions';
import { getProduct } from '../store/reducers/product.reducers';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  product: Observable<Product>;

    // inputs data

   subgetname: BehaviorSubject<string> = new BehaviorSubject<string>('');
   obsgetname: any;
   nameproduct = '';


    // inputs data

  constructor(private route: ActivatedRoute ,
              private store: Store<AppState>){
    this.obsgetname = this.subgetname;
  }

  ngOnInit(): void {

    this.route.params.subscribe( params => {
      this.store.dispatch(productGet({id: +params.id}));
    });

    this.product = this.store.select(getProduct).pipe(
     map((dataVal) => dataVal != null && dataVal !== undefined ? dataVal[0] : dataVal),
      find((val) => val !== null)
    );

    this.product.subscribe((pro) => {
        this.nameproduct = pro.name;
        this.subgetname.next(pro.name);
    });

  }

}
