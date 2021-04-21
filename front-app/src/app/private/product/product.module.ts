import { NgModule } from '@angular/core';
import { productsRoutedComponents , ProductsRoutingModule} from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { ProductService } from './store/services/product.service';
import { EffectsModule  } from '@ngrx/effects';
import { ProductEffects } from './store/effects/product.effects';
import * as productReducers from './store/reducers/product.reducers';
import { TraceService } from '../../shared/utils/traceService';


@NgModule({
  imports: [
    SharedModule,
    ProductsRoutingModule,
    StoreModule.forFeature('product', productReducers.reducer),
    EffectsModule.forFeature([ProductEffects])
  ],
  declarations: [productsRoutedComponents],
  providers: [
    TraceService,
    ProductService
   ]
})
export class ProductsModule {

}
