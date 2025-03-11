import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { Note } from 'tonal';
import { TonalService } from '../../../../../services/tonal.service';

@Component({
  selector: 'app-cadencia',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cadencia.component.html',
  styleUrl: './cadencia.component.scss'
})
export class CadenciaComponent {
  ligado = 'button primary small';
  desligado = 'button small';
  btnGrau = this.ligado;
  btnAcorde = this.desligado;
  note = '';
  notes = [
    { note: 'I-' },
    { note: 'II- b5' },
    { note: 'III' },
    { note: 'IV-' },
    { note: 'V-' },
    { note: 'VI' },
    { note: 'VII ' }
  ];
  notasDescritivas = [
    { note: 'Imaj7' },
    { note: 'IIm7' },
    { note: 'IIIm7' },
    { note: 'IVmaj7' },
    { note: 'V7' },
    { note: 'VIm7' },
    { note: 'VIIm7b5' }
  ];

  constructor(private tonalService: TonalService, private ngZone: NgZone) {
    this.tonalService.currentTonality.subscribe(value => {
      this.ngZone.run(() => {
        this.note = value[value.length - 1];
        this.notasDescritivas[0].note = this.note;
        this.notasDescritivas[1].note = Note.transpose(this.note, '2M');
        this.notasDescritivas[2].note = Note.transpose(this.note, '3m');
        this.notasDescritivas[3].note = Note.transpose(this.note, '4M');
        this.notasDescritivas[4].note = Note.transpose(this.note, '5M');
        this.notasDescritivas[5].note = Note.transpose(this.note, '6m');
        this.notasDescritivas[6].note = Note.transpose(this.note, '7m');
      });
    });
  }

  ngOnInit(): void {
  }

  changeView(ativo: string) {
    if (ativo === 'acorde') {
      this.btnGrau = 'button small';
      this.btnAcorde = 'button primary small';
      this.changeAcorde();
    }
    else if (ativo === 'grau') {
      this.btnGrau = 'button primary small';
      this.btnAcorde = 'button small';
      this.changeGrau();
    }
  }

  changeAcorde() {
    this.notes[0].note = this.note + 'm';
    this.notes[1].note = Note.transpose(this.note, '2M') + 'mb5';
    this.notes[2].note = Note.transpose(this.note, '3m');
    this.notes[3].note = Note.transpose(this.note, '4M') + 'm';
    this.notes[4].note = Note.transpose(this.note, '5M') + 'm';
    this.notes[5].note = Note.transpose(this.note, '6m');
    this.notes[6].note = Note.transpose(this.note, '7m');
  }

  changeGrau() {
    this.notes[0].note = 'I-';
    this.notes[1].note = 'II- b5';
    this.notes[2].note = 'III';
    this.notes[3].note = 'IV-';
    this.notes[4].note = 'V';
    this.notes[5].note = 'VI';
    this.notes[6].note = 'VII';
  }
}
