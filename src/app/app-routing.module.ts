import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';
//Home
import { HomeRoutingModule } from './home/home-routing.module';
import { DetailRoutingModule } from './detail/detail-routing.module';
//O modo maior
import { TeoriaRoutingModule } from './teoria/teoria-routing.module';
//Config
import { ConfigRoutingModule } from "./config/config-routing.module";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {}),
    HomeRoutingModule,
    DetailRoutingModule,
    TeoriaRoutingModule,
    ConfigRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
