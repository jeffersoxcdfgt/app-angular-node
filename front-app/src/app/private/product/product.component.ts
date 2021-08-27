import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../app.state';
import { getProductsError } from './store/reducers/product.reducers';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  constructor(private router: Router, private store: Store<AppState>){
  }

  ngOnInit(): void {
    this.store.select(getProductsError).subscribe((error) => this.loadingError(error));
  }

  /*
   * Display error message if load of products fails
   */
     loadingError(error): void {
      if (error) {
        alert('Error while loading the list of products');
      }
    }

}
