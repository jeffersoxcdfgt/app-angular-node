import { Component, OnInit } from '@angular/core';
import { ValidationProductService } from '../../../shared/validations/validationProduct';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  filePath = '';

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

  imagePreview(e): void {
    const file = (e.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }



}
