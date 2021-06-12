import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Product } from '../class/product';
import { Observable , of, BehaviorSubject } from 'rxjs';
import { mergeMap , switchMap , map } from 'rxjs/operators';
import { getAllProducts } from '../store/reducers/product.reducers';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  p: any;
  products: Observable<Product[]>;
  auxproducts: Observable<Product[]>;
  subgetSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products = this.store.select(getAllProducts);
    this.auxproducts = this.products;
    this.searchData();
    this.products.subscribe( data => {
      if (data.length > 0){
        // console.log(data,"private")
      }
    });
  }

  searchData = () => {
    const source =  this.subgetSearch
      .pipe(mergeMap((inputdata: string) =>
           this.products.pipe(
                      map((allproducts: Product[]) => ( allproducts.filter((oneproduct) =>
                        oneproduct.name.toLowerCase().includes(inputdata.toLowerCase()) === true))),
                             switchMap(valpro => ( inputdata === '' ? this.auxproducts : of<Product[]>(valpro))),
           )
         ),
       map((becomeproduct) =>  this.products = of<Product[]>(becomeproduct)),
    );
    source.subscribe((myproducts) => this.products = myproducts);
}

}
