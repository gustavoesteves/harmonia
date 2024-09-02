import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './funcional/maior/menu/menu.component';

const routes: Routes = [
  {
    path: 'funcional-maior',
    component: MenuComponent
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeoriaRoutingModule {}
