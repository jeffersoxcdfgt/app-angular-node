import { NgModule   } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';

//components
import { MenuAdminComponent } from './menu-admin.component';
import { HomeManageComponent } from '../home-manage/home-manage.component';


const menuRoutes : Routes  =  <Routes>[{
  path:'',
  component :MenuAdminComponent,
  children:[
    { path:'homemanage' , component:  HomeManageComponent }
  ]
}] as Routes;;

@NgModule({
  imports:[
    RouterModule.forChild(menuRoutes)
  ],
  exports:[RouterModule]
})
export class MenuRoutingModule {
}

export const menuRoutedComponents = [
  MenuAdminComponent,
  HomeManageComponent
]
