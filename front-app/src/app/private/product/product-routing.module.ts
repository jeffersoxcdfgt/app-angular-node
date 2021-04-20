import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

// components
import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

const productsRoutes: Routes  =  [{
  path: '',
  component : ProductComponent,
  children: [
    { path: '' , component:  ProductListComponent },
    { path: 'detail/:id' , component: ProductDetailComponent  },
    { path: 'create' , component:  ProductCreateComponent },
    { path: 'edit/:id',  component: ProductEditComponent}
  ]
}] as Routes;

@NgModule({
  imports: [
    RouterModule.forChild(productsRoutes)
  ],
  exports: [RouterModule]
})
export class ProductsRoutingModule {
}

export const productsRoutedComponents = [
  ProductComponent,
  ProductListComponent,
  ProductCreateComponent,
  ProductDetailComponent,
  ProductEditComponent
];
