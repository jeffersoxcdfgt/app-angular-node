import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

// components
import { AdminComponent } from './admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';


const adminRoutes: Routes  =  [{
  path: '',
  component : AdminComponent,
  children: [
    { path: '' , component:  LoginAdminComponent },
    {
      path: 'menu',
      loadChildren: () => import('./menu-admin/menu.module').then(m => m.MenuModule)
    }

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
  AdminComponent,
  LoginAdminComponent
];
