import { NgModule  } from '@angular/core';
import { menuRoutedComponents , MenuRoutingModule} from './menu-routing.module';
import {AuthGuardService} from '../store/services/auth-guard.service';
import { UserService } from '../store/services/login.service';
import { TraceService } from '../../shared/utils/traceService';


@NgModule({
  imports: [
    MenuRoutingModule,
  ],
  declarations: [menuRoutedComponents],
  providers: [
    AuthGuardService,
    UserService ,
    TraceService,
  ]
})
export class MenuModule {

}
