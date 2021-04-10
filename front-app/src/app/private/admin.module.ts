import { NgModule , InjectionToken  } from '@angular/core';
import { UserService } from './store/services/login.service';
import { adminRoutedComponents , AdminRoutingModule} from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule , ActionReducerMap , MetaReducer, ActionReducer , META_REDUCERS } from '@ngrx/store';
import { EffectsModule  } from '@ngrx/effects';
import { UserEffects } from './store/effects/login.effects';
import * as usersReducers from './store/reducers/login.reducers';
import { TraceService } from '../shared/utils/traceService';
import { FormsModule } from '@angular/forms';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersHook } from './store/webhooks/webhooks';


export const reducers: ActionReducerMap<any> = {
  user: usersReducers.reducer,
};

const reducerKeys = ['user'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({keys: reducerKeys})(reducer);
}
export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];


@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
       strictStateImmutability: true,
       strictActionImmutability: true
     }
    }),
    EffectsModule.forRoot([UserEffects]),
    FormsModule,
  ],
  declarations: [adminRoutedComponents, LoginAdminComponent],
  providers: [
    UserService ,
    TraceService,
    {
      provide: META_REDUCERS,
      deps: [],
      useFactory: usersHook,
      multi: true
    }
   ]
})
export class AdminModule {

}
