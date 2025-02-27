import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INotes, INotesComplete } from '../../../../../services/interfaces/notes.interface';
import { TonalService } from '../../../../../services/tonal.service';
import { Note, Chord } from 'tonal';
import { IConfigMenu } from '../../../../../services/interfaces/menu.interface';

@Component({
  selector: 'app-dominante-secundaria',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dominante-secundaria.component.html',
  styleUrl: './dominante-secundaria.component.scss'
})
export class DominanteSecundariaComponent {
  header = ['Grau', 'Acorde', 'Notas', 'Escalas', 'Extenções'];
  secondaryDominants: INotesComplete[] = [];
  extendedDominants: INotesComplete[] = [];
  menuSelecionado: IConfigMenu[] = [
    { Name: 0, Status: "button primary fit small" },
    { Name: 1, Status: "button  fit small" },
  ];
  constructor(private tonalService: TonalService) { }

  ngOnInit() {
    this.tonalService.currentTonality.subscribe(value => {
      const note = value[value.length - 1];
      this.secondaryDominants = this.GetSecondaryDominants(note);
      this.extendedDominants = this.GetExtendedDominants(note);
    });
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

  GetExtendedDominants(note: string) {
    const result: INotesComplete[] = [];
    let changeNote = '';

    changeNote = Note.transpose(note, '4A');
    result.push({
      Grau: '',
      Acorde: changeNote + '7',
      Notas:
        Note.transpose(changeNote, '1P') + ', ' +
        Note.transpose(changeNote, '3M') + ', ' +
        Note.transpose(changeNote, '5P') + ', ' +
        Note.transpose(changeNote, '7m'),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3M', '7m', '2M', '6m']),
      Extenções: '(9, b13) <br> (' +
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6m'),
      Cadência: ''
    });

    return result;
  }

  GetSecondaryDominants(note: string) {
    const result: INotesComplete[] = [];
    let changeNote = '';

    // V7/II
    changeNote = Note.transpose(note, '6M');
    result.push({
      Grau: 'V/II',
      Acorde: changeNote + '7',
      Notas:
        Note.transpose(changeNote, '1P') + ', ' +
        Note.transpose(changeNote, '3M') + ', ' +
        Note.transpose(changeNote, '5P') + ', ' +
        Note.transpose(changeNote, '7m'),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3M', '7m', '2M', '6m']),
      Extenções: '(9, b13) <br> (' +
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6m'),
      Cadência: ''
    });

    // V7/III
    changeNote = Note.transpose(note, '7M');
    result.push({
      Grau: 'V/III',
      Acorde: changeNote + '7',
      Notas:
        Note.transpose(changeNote, '1P') + ', ' +
        Note.transpose(changeNote, '3M') + ', ' +
        Note.transpose(changeNote, '5P') + ', ' +
        Note.transpose(changeNote, '7m'),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3M', '5P', '6m', '7m', '2A']),
      Extenções: '(b9, #9, b13) <br> (' +
        Note.transpose(changeNote, '2m') + ', ' +
        Note.transpose(changeNote, '3m') + ', ' +
        Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(changeNote, '2m') + ', ' +
        Note.transpose(changeNote, '3m') + ', ' +
        Note.transpose(changeNote, '6m'),
      Cadência: ''
    });

    // V7/IV
    result.push({
      Grau: 'V/IV',
      Acorde: note + '7',
      Notas: Chord.get(note + '7').notes.toString(),
      Escalas: this.tonalService.GetScales(note, ['Mixolídio'], [], []),
      Extenções: '(9, 13) <br> (' +
        Note.transpose(note, '2M') + ', ' +
        Note.transpose(note, '6M') + ')',
      NotasExtendidas:
        Note.transpose(note, '2M') + ', ' +
        Note.transpose(note, '6M'),
      Cadência: ''
    });

    // V7/V
    changeNote = Note.transpose(note, '2M');
    result.push({
      Grau: 'V/V',
      Acorde: changeNote + '7',
      Notas: Chord.get(changeNote + '7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, ['Mixolídio'], [], []),
      Extenções: '(9, 13) <br> (' +
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(changeNote, '2M') + ', ' +
        Note.transpose(changeNote, '6M'),
      Cadência: ''
    });

    // V7/VI
    changeNote = Note.transpose(note, '3M');
    result.push({
      Grau: 'V/VI',
      Acorde: changeNote + '7',
      Notas: Chord.get(changeNote + '7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3M', '5P', '6m', '7m', '2A']),
      Extenções: '(b9, #9, b13) <br> (' +
        Note.transpose(changeNote, '2m') + ', ' +
        Note.transpose(changeNote, '2A') + ', ' +
        Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(changeNote, '2m') + ', ' +
        Note.transpose(changeNote, '2A') + ', ' +
        Note.transpose(changeNote, '6m'),
      Cadência: ''
    });

    return result;
  }

  loadChords(chord: INotes) {
    this.tonalService.pushChord(chord);
  }
}