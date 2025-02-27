import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { IConfig } from '../../../services/interfaces/config.interface';
import { TonalService } from '../../../services/tonal.service';
import { IInstruments } from '../../../services/interfaces/instruments.interface';
import { INote } from '../../../services/interfaces/notes.interface';
import { CommonModule } from '@angular/common';
import { ISATB } from '../../../services/interfaces/satb.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  config: IConfig = {
    InitialTone: '',
    RecordTone: false,
    LastTone: '',
    InitialInstrument: '',
    RecordInstrument: false,
    LastInstrument: ''
  };

  instruments: IInstruments[] = [];
  notes: INote[] = [];
  SATB: ISATB[] = [
    {
      voz: '',
      tessitura: [{
        alto: "",
        altoOitava: 0,
        baixo: "",
        baixoOitava: 0,
      }]
    }];

  constructor(
    private tonalService: TonalService
  ) { }

  ngOnInit(): void {
    this.LoadConfig();
    this.LoadIntruments();
    this.LoadNotes();
    this.LoadSATB();
  }

  // #region Load
  async LoadConfig() {
    try {
      this.config = await (window as any).electron.readData('config.json');
      //this.tonalService.pushTonality(this.config.InitialTone);
    } catch (error) {
      console.error('Error loading config:', error);
    }
  }

  async LoadIntruments() {
    try {
      this.instruments = await (window as any).electron.readData('instruments.json');
    } catch (error) {

    }
  }

  async LoadNotes() {
    try {
      this.notes = await (window as any).electron.readData('notes.json');
    } catch (error) {

    }
  }

  async LoadSATB() {
    try {
      this.SATB = await (window as any).electron.readData('SATB.json');
    } catch (error) {

    }
  }
  // #endregion

  // #region Write
  async onCheckToneChange(event: Event) {
    this.config.RecordTone = (event.target as HTMLInputElement).checked;
    try {
      await (window as any).electron.writeData('config.json', this.config);
    } catch (error) {
      console.error('Error updating config:', error);
    }
  }

  async onCheckInstrumentChange(event: Event) {
    this.config.RecordInstrument = (event.target as HTMLInputElement).checked;
    try {
      await (window as any).electron.writeData('config.json', this.config);
    } catch (error) {
      console.error('Error updating config:', error);
    }
  }

  async onToneChange(event: Event, tone: boolean) {
    if (tone) {
      this.config.InitialTone = (event.target as HTMLSelectElement).value;
    } else {
      this.config.InitialInstrument = (event.target as HTMLSelectElement).value;
    }
    try {
      await (window as any).electron.writeData('config.json', this.config);
    } catch (error) {
      console.error('Error updating config:', error);
    }
  }

  async onRangeChange(event: Event, SATB: number, alta: boolean) {
    if (alta) {
      this.SATB[SATB].tessitura[0].altoOitava = (event.target as HTMLInputElement).valueAsNumber + 1;
    } else {
      this.SATB[SATB].tessitura[0].baixoOitava = (event.target as HTMLInputElement).valueAsNumber + 1;
    }
    try {
      await (window as any).electron.writeData('SATB.json', this.SATB);
    } catch (error) {
      
    }
  }

  async onToneTessituraChange(event: Event, SATB: number, alta: boolean) {
    if (alta) {
      this.SATB[SATB].tessitura[0].alto = (event.target as HTMLSelectElement).value;
    } else {
      this.SATB[SATB].tessitura[0].baixo = (event.target as HTMLSelectElement).value;
    }
    try {
      await (window as any).electron.writeData('SATB.json', this.SATB);
    } catch (error) {
      
    }
  }
  // #endregion
}
