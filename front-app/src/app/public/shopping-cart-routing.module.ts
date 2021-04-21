import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

// components
import { ShoppingCartComponent } from './shopping-cart.component';
import { ShoppingCartListComponent } from './shopping-cart-list/shopping-cart-list.component';


const shoppingcartRoutes: Routes  =  [{
  path: '',
  component : ShoppingCartComponent,
  children: [
    { path: '' , component:  ShoppingCartListComponent }
  ]
}] as Routes;

@NgModule({
  imports: [
    RouterModule.forChild(shoppingcartRoutes)
  ],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule {
}

export const shoppingcartRoutedComponents = [
  ShoppingCartComponent,
  ShoppingCartListComponent
];
