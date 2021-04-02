import { NgModule  } from '@angular/core';
import { menuRoutedComponents , MenuRoutingModule} from './menu-routing.module';

@NgModule({
  imports: [
    MenuRoutingModule,
  ],
  declarations: [menuRoutedComponents],
  providers: []
})
export class MenuModule {

}
