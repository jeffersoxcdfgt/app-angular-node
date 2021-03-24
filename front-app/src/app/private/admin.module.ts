import { NgModule , InjectionToken  } from '@angular/core';
import { UserService } from './store/services/login.service';
import { adminRoutedComponents , AdminRoutingModule} from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule , ActionReducerMap } from '@ngrx/store';
import { EffectsModule  } from '@ngrx/effects';
import { UserEffects } from './store/effects/login.effects';
import * as usersReducers from './store/reducers/login.reducers';
import { TraceService } from '../shared/utils/traceService';
import { FormsModule } from '@angular/forms';

import { LoginAdminComponent } from './login-admin/login-admin.component';

export const reducers: ActionReducerMap<any> = {
  user: usersReducers.reducer,
};

@NgModule({
  imports: [
    SharedModule,
    AdminRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([UserEffects]),
    FormsModule,
  ],
  declarations: [adminRoutedComponents, LoginAdminComponent],
  providers: [
    UserService ,
    TraceService,
   ]
})
export class AdminModule {

}
