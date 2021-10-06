import { Component , OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../../app.state';
import { getDeleteError, getProductsError, getUpdateError, isCreated, isUpdated } from './store/reducers/product.reducers';
import { productsGetAll } from './store/actions/product.actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {


  constructor(private router: Router, private store: Store<AppState>){
  }

  ngOnInit(): void {
//    this.store.dispatch(productsGetAll());
    this.store.select(getProductsError).subscribe((error) => this.loadingError(error));

    this.store.select(isCreated).subscribe((done) => this.actionSuccess(done));
    this.store.select(isUpdated).subscribe((done) => this.actionSuccess(done));

    this.store.select(getDeleteError).subscribe((error) =>
                  this.actionError(error, 'Error while deleting the product'));

    this.store.select(getUpdateError).subscribe((error) =>
                  this.actionError(error, 'Error while updating the product'));

  }


  /**
   * Display success message after execute specific action over the product
   * @param done true if action was completed or false
   * @param message the message to be displayed
   */
     actionSuccess(done: boolean): void {
      if (done) {
        this.router.navigate(['/user/menu/product']);
      }
    }


  /*
   * Display error message if load of products fails
   */
     loadingError(error): void {
      if (error) {
        Swal.fire({title: 'Error!', text: 'Error while loading the list of products',
                  icon: 'error', confirmButtonText: 'Cool'});
      }
    }

  /**
   * Display error message is execution of action fails
   * @param error the error thrown
   * @param message the message to be displayed
   */
    actionError(error, message: string): void {
      if (error) {
        Swal.fire({title: 'Error!', text: message, icon: 'error', confirmButtonText: 'Cool' });
      }
    }

}
