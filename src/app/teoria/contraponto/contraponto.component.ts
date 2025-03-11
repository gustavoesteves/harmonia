import { Component } from '@angular/core';
import { IConfigMenu } from '../../services/interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { IntroducaoComponent } from './introducao/introducao.component';
import { PrimeiraComponent } from './primeira/primeira.component';
import { SegundaComponent } from './segunda/segunda.component';
import { TerceiraComponent } from './terceira/terceira.component';
import { QuartaComponent } from './quarta/quarta.component';

@Component({
  selector: 'app-contraponto',
  standalone: true,
  imports: [
    CommonModule,
    IntroducaoComponent,
    PrimeiraComponent,
    SegundaComponent,
    TerceiraComponent,
    QuartaComponent
  ],
  templateUrl: './contraponto.component.html',
  styleUrl: './contraponto.component.scss'
})
export class ContrapontoComponent {
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
