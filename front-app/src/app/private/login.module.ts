import { NgModule , InjectionToken  } from '@angular/core';
import { UserService } from './store/services/login.service';
import { adminRoutedComponents , AdminRoutingModule} from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

import { StoreModule , ActionReducerMap , ActionReducer, MetaReducer , StoreConfig , META_REDUCERS } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { EffectsModule  } from '@ngrx/effects';
import { UserEffects } from './store/effects/login.effects';
import * as usersReducers from './store/reducers/login.reducers';
import { TraceService } from '../shared/utils/traceService';
import { FormsModule } from '@angular/forms';
import {  AppState } from '../app.state';
import { usersHook } from './store/webhooks/webhooks';

import { AppInMemoryApi } from '../app.in-memory.api';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

export const reducers: ActionReducerMap<any> = {
  user: usersReducers.reducer,
};

@NgModule({
  imports: [
   // HttpClientInMemoryWebApiModule.forRoot(AppInMemoryApi),
    SharedModule,
    AdminRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects]),
    FormsModule,
  ],
  declarations: [adminRoutedComponents],
  providers: [
    UserService ,
    TraceService,
  /*  {
      provide: META_REDUCERS,
      deps: [TraceService],
      useFactory: usersHook,
      multi: true
    }*/
   ]
})
export class LoginModule {

}
