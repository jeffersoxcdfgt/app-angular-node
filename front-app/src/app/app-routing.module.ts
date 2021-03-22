import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { PageNotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { path:'' , redirectTo:'/user' , pathMatch:'full'},
  {
    path:'user',
    loadChildren: () => import('./private/login.module').then(m => m.LoginModule)
  },
  {path: '**', component: PageNotFoundComponent}
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports:[RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
