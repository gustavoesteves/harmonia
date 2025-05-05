import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './funcional/maior/menu.component';
import { MenuMenorComponent } from './funcional/menor/menu-menor.component';
import { ContrapontoComponent } from './contraponto/contraponto.component';

const routes: Routes = [
  {
    path: 'funcional-maior', component: MenuComponent
  },
  {
    path: 'funcional-menor', component: MenuMenorComponent
  },
  {
    path: 'contraponto', component: ContrapontoComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeoriaRoutingModule { }
