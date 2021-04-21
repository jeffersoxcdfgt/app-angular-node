import { NgModule  } from '@angular/core';
import { shoppingcartRoutedComponents , ShoppingCartRoutingModule} from './shopping-cart-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    ShoppingCartRoutingModule,
  ],
  declarations: [shoppingcartRoutedComponents],
  providers: [ ]
})
export class ShoppingCartModule {

}
