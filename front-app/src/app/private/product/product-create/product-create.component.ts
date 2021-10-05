import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject , combineLatest} from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { ValidationProductService } from '../../../shared/validations/validationProduct';
import { Product } from '../class/product';
import { productCreate } from '../store/actions/product.actions';


@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  filePath = '';

  // inputs data

  subgetname: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetname: any;

  subgetdescription: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetdescription: any;

  subgetprice: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetprice: any;

  subgetcost: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetcost: any;

  subgetimage: BehaviorSubject<string> = new BehaviorSubject<string>('');
  obsgetimage: any;

  productAdd = {};
  // pruductSend = new Product();

  // inputs data

  constructor(public validationProductService: ValidationProductService,
              private store: Store<AppState>,
              private router: Router) {
    this.validationProductService.initValidation();

    this.obsgetname = this.subgetname;
    this.obsgetdescription = this.subgetdescription;
    this.obsgetprice = this.subgetprice;
    this.obsgetcost = this.subgetcost;
    this.obsgetimage = this.subgetimage;

   }

  ngOnInit(): void {
         combineLatest([
          this.obsgetname ,
          this.obsgetdescription,
          this.obsgetprice,
          this.obsgetcost,
          this.obsgetimage
        ]
       )
       .pipe(
               map((
                 [name,
                  description,
                  price,
                  cost,
                  image
                ])  =>  ({ name, description, price, cost, image}))
      )
      .subscribe((data) => this.productAdd = data);
  }

  saveProduct = () => {
    if (this.validationProductService.ifGood()){
      const pruductSend: Product = this.productAdd;
      pruductSend.picture =  `../../../assets/img/${pruductSend.name}.jpeg`;
      this.store.dispatch(productCreate({
        product: pruductSend
      }));
    }
  }

  imagePreview = (e) => {
    this.getFileContent((e.target as HTMLInputElement).files[0]);
  }

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt): void{
    evt.preventDefault();
    evt.stopPropagation();
  }

  // Dragleave listener
  @HostListener('dragover', ['$event']) onDragLeave(evt): void{
      evt.preventDefault();
      evt.stopPropagation();
  }

  // Drop listener
   @HostListener('drop', ['$event']) ondrop(evt): void{
    evt.preventDefault();
    evt.stopPropagation();
    this.getFileContent(evt.dataTransfer.files[0]);
  }

  getFileContent = (datafile) => {
    const file = datafile;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
      this.subgetimage.next( this.filePath);
    };
    reader.readAsDataURL(file);
   }
}
