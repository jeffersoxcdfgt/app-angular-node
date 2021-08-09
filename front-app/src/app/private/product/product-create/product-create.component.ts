import { Component, HostListener, OnInit } from '@angular/core';
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

  imagePreview = (e) => {
    this.getFileConetent((e.target as HTMLInputElement).files[0]);
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
    this.getFileConetent(evt.dataTransfer.files[0]);
  }

  getFileConetent = (datafile) => {
    const file = datafile;
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(file);
   }
}
