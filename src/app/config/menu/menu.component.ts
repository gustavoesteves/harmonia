import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfigMenu } from '../../services/interfaces/menu.interface';
import { HomeComponent } from "./home/home.component";
import { InstrumentsComponent } from "./instruments/instruments.component";
import { HarmoniaComponent } from "./harmonia/harmonia.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    HomeComponent,
    InstrumentsComponent,
    HarmoniaComponent
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  menuConfig: IConfigMenu[] = [
    { Name: 0, Status: "ActiveMenu" },
    { Name: 1, Status: "" },
    { Name: 2, Status: "" }
  ];

  ngOnInit() {
  }

  changeMenu(menu: number) {
    for (let index = 0; index < this.menuConfig.length; index++) {
      if (menu === this.menuConfig[index].Name) {
        this.menuConfig[index].Status = "ActiveMenu";
      } else {
        this.menuConfig[index].Status = "";
      }
    }
  }

}
