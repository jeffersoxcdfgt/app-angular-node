import { NgModule , InjectionToken  } from '@angular/core';
import { productsRoutedComponents , ProductsRoutingModule} from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { StoreModule , ActionReducerMap , ActionReducer, MetaReducer , StoreConfig , META_REDUCERS } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule  } from '@ngrx/effects';

import { TraceService } from '../../shared/utils/traceService';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
  ],
  declarations: [productsRoutedComponents],
  providers: [
    TraceService,
   ]
})
export class ProductsModule {

}
