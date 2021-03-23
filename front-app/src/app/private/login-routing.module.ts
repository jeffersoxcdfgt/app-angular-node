import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

// components
import { LoginComponent } from './login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';


const adminRoutes: Routes  =  [{
  path: '',
  component : LoginComponent,
  children: [
    { path: 'homeadmin' , component:  HomeAdminComponent },
  
  ]
}] as Routes;

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}

export const adminRoutedComponents = [
  LoginComponent,
  HomeAdminComponent
];
