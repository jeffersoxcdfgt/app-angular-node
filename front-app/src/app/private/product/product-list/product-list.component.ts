import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { Product } from '../class/product';
import { Observable , of, BehaviorSubject } from 'rxjs';
import { mergeMap , switchMap , map, filter, tap } from 'rxjs/operators';
import { getAllProducts } from '../store/reducers/product.reducers';
import { productDelete } from '../store/actions/product.actions';
import { MessageBoxComponent } from 'src/app/shared/components/message-box/message-box.component';

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
  messageValidation = '';
  @ViewChild('messageBoxComponent') messageBoxComponent: MessageBoxComponent;
  id: number;
  amountperpagge = 6;


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
      this.products = this.store.select(getAllProducts);
      this.auxproducts = this.products;
      this.searchData();
  }

  searchData = () => {
    const source =  this.subgetSearch
      .pipe(mergeMap((inputdata: string) =>
           this.products.pipe(
             tap((lstpro) =>  this.p = lstpro.length <= this.amountperpagge ? 1 : this.p ),
                filter((valuesprocess) =>  valuesprocess !== undefined),
                      map((allproducts: Product[]) => ( allproducts.filter((oneproduct) =>
                      oneproduct.hasOwnProperty('name') && oneproduct.name.toLowerCase().includes(inputdata.toLowerCase()) === true))),
                             switchMap(valpro => ( inputdata === '' ? this.auxproducts : of<Product[]>(valpro))),
           )
         ),
       map((becomeproduct) =>  this.products = of<Product[]>(becomeproduct)),
    );
    source.subscribe((myproducts) => this.products = myproducts);
}

  delete = (id: number) => {
    this.messageValidation = 'Are you sure to delete it?';
    this.id = id;
    this.messageBoxComponent.open();
  }

  // Here dispatch action

  deleteAcction = () => this.store.dispatch(productDelete({idproduct: this.id }));

}
