import { Component, OnInit } from '@angular/core';
import { ValidationProductService } from '../../../shared/validations/validationProduct';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  constructor(public validationProductService: ValidationProductService) {
    this.validationProductService.initValidation();
   }

  ngOnInit(): void {
  }

  saveProduct = () => {
    if (this.validationProductService.ifGood()){
      console.log('saveProduct()');
    }
  }

}
