import { NgModule  } from '@angular/core';
import { shoppingcartRoutedComponents , ShoppingCartRoutingModule} from './shopping-cart-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap , MetaReducer, ActionReducer , META_REDUCERS } from '@ngrx/store';
import { EffectsModule  } from '@ngrx/effects';
import { ProductEffects } from '../private/product/store/effects/product.effects';
import * as productReducers from '../private/product/store/reducers/product.reducers';
import { TraceService } from '../shared/utils/traceService';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../private/product/store/services/product.service';
import {NgxPaginationModule} from 'ngx-pagination';

import * as shoppingCartReducers from './store/reducers/shopping-cart.reducers';
import { ShoppingcartEffects } from './store/effects/shopping-cart.effects';
import { ShoppingcartService } from './store/services/shopping-cart.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

export const reducers: ActionReducerMap<any> = {
  product: productReducers.reducer,
  shoppingcart: shoppingCartReducers.reducer
};

@NgModule({
  imports: [
    SharedModule,
    NgxMaskModule.forRoot(),
    ShoppingCartRoutingModule,
    NgxPaginationModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot(
      [
        ProductEffects,
        ShoppingcartEffects
      ]),
    FormsModule,
  ],
  declarations: [shoppingcartRoutedComponents],
  providers: [
    ProductService,
    ShoppingcartService,
    TraceService
  ]
})
export class ShoppingCartModule {

}
