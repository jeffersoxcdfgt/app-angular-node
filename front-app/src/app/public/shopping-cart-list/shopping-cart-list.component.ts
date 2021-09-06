import { Component, OnInit , Input , Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { Product } from '../../private/product/class/product';
import { Observable , BehaviorSubject , of } from 'rxjs';
import { mergeMap, map ,  switchMap, startWith, filter } from 'rxjs/operators';
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
  auxproducts: Observable<Product[]>;
  subgetSearch: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.products = this.store.select(getAllProducts);
    this.auxproducts = this.products;
    this.store.select(getProductInShoppingCartError).subscribe((error) => this.loadingError(error));
    this.searchData();
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


    searchData = () => {
        const source =  this.subgetSearch
          .pipe(mergeMap((inputdata: string) =>
               this.products.pipe(
                     filter((valuesprocess) =>  valuesprocess !== undefined),
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
