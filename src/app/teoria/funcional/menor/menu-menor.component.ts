import { Component } from '@angular/core';
import { IntroducaoComponent } from './introducao/introducao.component';
import { ModosComponent } from './modos/modos.component';
import { IConfigMenu } from '../../../services/interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { CadenciaComponent } from './cadencia/cadencia.component';

@Component({
  selector: 'app-menu-menor',
  standalone: true,
  imports: [
    CommonModule,
    IntroducaoComponent,
    CadenciaComponent,
    ModosComponent
  ],
  templateUrl: './menu-menor.component.html',
  styleUrl: './menu-menor.component.scss'
})
export class MenuMenorComponent {
menuSelecionado: IConfigMenu[] = [
    { Name: 0, Status: "ActiveMenu" },
    { Name: 1, Status: "" },
    { Name: 2, Status: "" },
    { Name: 3, Status: "" },
    { Name: 4, Status: "" },
    { Name: 5, Status: "" },
    { Name: 6, Status: "" },
    { Name: 7, Status: "" },
  ];

  changeMenu(menu: number) {
    for (let index = 0; index < this.menuSelecionado.length; index++) {
      if (menu === this.menuSelecionado[index].Name) {
        this.menuSelecionado[index].Status = "ActiveMenu";
      } else {
        this.menuSelecionado[index].Status = "";
      }
    }
  }
}
