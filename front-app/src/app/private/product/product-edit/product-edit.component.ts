import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, find, map, mergeMap, tap } from 'rxjs/operators';
import { AppState } from 'src/app/app.state';
import { ValidationProductService } from 'src/app/shared/validations/validationProduct';
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

   subgetdescription: BehaviorSubject<string> = new BehaviorSubject<string>('');
   obsgetdescription: any;
   descproduct = '';

   subgetprice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
   obsgetprice: any;
   priceproduct = 0;

   subgetcost: BehaviorSubject<number> = new BehaviorSubject<number>(0);
   obsgetcost: any;
   costproduct = 0;

   subgetimage: BehaviorSubject<string> = new BehaviorSubject<string>('');
   obsgetimage: any;
   pictureproduct = '';

   filePath = '';


    // inputs data

  constructor(public validationProductService: ValidationProductService,
              private route: ActivatedRoute ,
              private store: Store<AppState>){
    this.validationProductService.initValidation();
    this.obsgetname = this.subgetname;
    this.obsgetdescription = this.subgetdescription;
    this.obsgetprice = this.subgetprice;
    this.obsgetcost = this.subgetcost;
    this.obsgetimage = this.subgetimage;
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
         // Name product
        this.nameproduct = pro.name;
        this.subgetname.next(pro.name);
        this.validationProductService.inputNameOfProduct(pro.name);
        this.validationProductService.inputNameLengthOfProduct(pro.name);

        // Description product
        this.descproduct = pro.description;
        this.subgetdescription.next(pro.description);
        this.validationProductService.inputDescriptionOfProduct(pro.description);
        this.validationProductService.inputDescriptionLengthOfProduct(pro.description);

        // Price product
        this.priceproduct = pro.price;
        this.subgetprice.next(pro.price);
        this.validationProductService.inputPriceOfProduct(`${pro.price}`);
        this.validationProductService.inputPriceOnlyNumberOfProduct(`${pro.price}`);

        // Cost product
        this.costproduct = pro.cost;
        this.subgetcost.next(pro.cost);
        this.validationProductService.inputCostOfProduct(`${pro.cost}`);
        this.validationProductService.inputCostOnlyNumberOfProduct(`${pro.cost}`);

        // Path image
        this.pictureproduct = pro.picture;
        this.subgetimage.next(pro.picture);
        this.validationProductService.inputImageOfProduct(pro.picture);
    });
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

   saveProduct = () => {
    if (this.validationProductService.ifGood()){
       // console.log('update product');
    }
  }


}
