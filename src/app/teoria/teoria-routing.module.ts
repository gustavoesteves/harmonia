import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './funcional/maior/menu/menu.component';
import { MenuMenorComponent } from './funcional/menor/menu/menu-menor.component';

const routes: Routes = [
  {
    path: 'funcional-maior', component: MenuComponent
  },
  {
    path: 'funcional-menor', component: MenuMenorComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeoriaRoutingModule { }
