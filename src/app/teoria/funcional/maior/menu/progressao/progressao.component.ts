import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfigMenu } from '../../../../../services/interfaces/menu.interface';

@Component({
  selector: 'app-progressao',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './progressao.component.html',
  styleUrl: './progressao.component.scss'
})
export class ProgressaoComponent {
  menuSelecionado: IConfigMenu[] = [
    { Name: 0, Status: "button primary fit small" },
    { Name: 1, Status: "button  fit small" },
  ];
  
}
