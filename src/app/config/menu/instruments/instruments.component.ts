import { Component } from '@angular/core';
import { IConfigMenu } from '../../../services/interfaces/menu.interface';
import { CommonModule } from '@angular/common';
import { IInstruments } from '../../../services/interfaces/instruments.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instruments',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './instruments.component.html',
  styleUrl: './instruments.component.scss'
})
export class InstrumentsComponent {
  menuSelecionado: IConfigMenu[] = [
    { Name: 0, Status: "button primary fit small" },
    { Name: 1, Status: "button  fit small" },
  ];

  instruments: IInstruments[] = [
    {
      Name: "",
      Strings: [{
        Note: "",
        Position: 0
      }]
    }
  ];

  ngOnInit(): void {
    this.LoadIntruments();
  }

  changeMenu(menu: number) {
    for (let index = 0; index < this.menuSelecionado.length; index++) {
      if (menu === this.menuSelecionado[index].Name) {
        this.menuSelecionado[index].Status = "button primary fit small";
      } else {
        this.menuSelecionado[index].Status = "button fit small";
      }
    }
  }

  // #region read
  async LoadIntruments() {
    try {
      this.instruments = await (window as any).electron.readData('instruments.json');
    } catch (error) {

    }
  }
  // #endregion

  // #region write

  // #endregion
}
