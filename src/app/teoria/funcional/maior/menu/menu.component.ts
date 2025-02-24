import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawChordsComponent } from "../../../draw-chords/draw-chords.component";
import { IntroducaoComponent } from './introducao/introducao.component';
import { CadenciaComponent } from './cadencia/cadencia.component';
import { AcordesComponent } from './acordes/acordes.component';
import { DominanteComponent } from './dominante/dominante.component';
import { DominanteSecundariaComponent } from "./dominante-secundaria/dominante-secundaria.component";
import { ProgressaoComponent } from "./progressao/progressao.component";
import { IConfigMenu } from '../../../../services/interfaces/menu.interface';
import { SubdominantenanteComponent } from './subdominantenante/subdominantenante.component';
import { DiminutoComponent } from './diminuto/diminuto.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    DrawChordsComponent,
    IntroducaoComponent,
    CadenciaComponent,
    AcordesComponent,
    DominanteComponent,
    DominanteSecundariaComponent,
    ProgressaoComponent,
    SubdominantenanteComponent,
    DiminutoComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
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

  ngOnInit() {
  }

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