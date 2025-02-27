import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IConfigMenu } from '../../../../../services/interfaces/menu.interface';
import { TonalService } from '../../../../../services/tonal.service';
import { INote, INotes, INotesComplete } from '../../../../../services/interfaces/notes.interface';
import { Chord, Note } from 'tonal';

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
  header = ['Acorde', 'Grau', 'Escalas', 'Extenções', 'Cadência'];
  twoFiveSecondaryDominant: INotesComplete[] = [];
  TwoDimishSecondaryDominant: INotesComplete[] = [];

  constructor(private tonalService: TonalService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.tonalService.currentTonality.subscribe(value => {
      const note = value[value.length - 1];
      this.twoFiveSecondaryDominant = this.GetTwoFiveSecondaryDominant(note);
      this.TwoDimishSecondaryDominant = this.GetTwoDimishSecondaryDominant(note);
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

  GetTwoFiveSecondaryDominant(note: string) {
    const result: INotesComplete[] = [];
    let changeNote = '';

    // II de V7/II
    changeNote = Note.transpose(note, '3M');
    result.push({
      Grau: 'II- de V/II',
      Acorde: changeNote + 'm7',
      Notas: Chord.get(changeNote + 'm7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5P', '7m', '4P', '6m']),
      Extenções: '(11) <br>' +
        '(' + Note.transpose(changeNote, '4M') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7'
    });

    changeNote = Note.transpose(note, '4A');
    result.push({
      Grau: 'II- de V/III',
      Acorde: changeNote + 'm7',
      Notas: Chord.get(changeNote + 'm7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5P', '7m', '4P', '6m']),
      Extenções: '(11, b13) <br>' +
        '(' + Note.transpose(changeNote, '4M') + ', ' + Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7'
    });

    changeNote = Note.transpose(note, '5P');
    result.push({
      Grau: 'II- de V/IV',
      Acorde: changeNote + 'm7',
      Notas: Chord.get(changeNote + 'm7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5P', '7m', '4P', '6m']),
      Extenções: '(9, 13) <br>' +
        '(' + Note.transpose(changeNote, '2M') + ', ' + Note.transpose(changeNote, '6M') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'Maj7'
    });

    changeNote = Note.transpose(note, '6M');
    result.push({
      Grau: 'II- de V/V',
      Acorde: changeNote + 'm7',
      Notas: Chord.get(changeNote + 'm7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5P', '7m', '4P', '2M']),
      Extenções: '(9, 11) <br>' +
        '(' + Note.transpose(changeNote, '2M') + ', ' + Note.transpose(changeNote, '4P') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7'
    });

    changeNote = Note.transpose(note, '7M');
    result.push({
      Grau: 'II- de V/VI',
      Acorde: changeNote + 'm7',
      Notas: Chord.get(changeNote + 'm7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5P', '7m', '6m', '2m']),
      Extenções: '(9, b13) <br>' +
        '(' + Note.transpose(changeNote, '2m') + ', ' + Note.transpose(changeNote, '6m') + ')',
      Cadência: changeNote + 'm7' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7',
      NotasExtendidas: '',
    });

    return result;
  }

  GetTwoDimishSecondaryDominant(note: string) {
    const result: INotesComplete[] = [];
    let changeNote = '';

    changeNote = Note.transpose(note, '3M');
    result.push({
      Grau: 'II- b5 de V/II',
      Acorde: changeNote + 'm7b5',
      Notas: Chord.get(changeNote + 'm7b5').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7m', '4P', '6m']),
      Extenções: '(11) <br>' +
        '(' + Note.transpose(changeNote, '4M') + ')',
      NotasExtendidas: '',
      Cadência:
        changeNote + 'm7b5' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7'
    });

    changeNote = Note.transpose(note, '4A');
    result.push({
      Grau: 'II- b5 de V/III',
      Acorde: changeNote + 'm7b5',
      Notas: Chord.get(changeNote + 'm7b5').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7m', '4P', '6m']),
      Extenções: '(11, b13) <br>' +
        '(' + Note.transpose(changeNote, '4M') + ', ' + Note.transpose(changeNote, '6m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7b5' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7'
    });

    changeNote = Note.transpose(note, '5P');
    result.push({
      Grau: 'II- b5 de V/IV',
      Acorde: changeNote + 'm7b5',
      Notas: Chord.get(changeNote + 'm7b5').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7m', '4P', '6m']),
      Extenções: '(9, 13) <br>' +
        '(' + Note.transpose(changeNote, '2M') + ', ' + Note.transpose(changeNote, '6M') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'm7b5' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'Maj7'
    });

    changeNote = Note.transpose(note, '6M');
    result.push({
      Grau: 'II- b5 de V/V',
      Acorde: changeNote + 'm7b5',
      Notas: Chord.get(changeNote + 'm7b5').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7m', '4P', '2M']),
      Extenções: '(9, 11) <br>' +
        '(' + Note.transpose(changeNote, '2M') + ', ' + Note.transpose(changeNote, '4P') + ')',
      Cadência: changeNote + 'm7b5' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7',
      NotasExtendidas: '',
    });

    changeNote = Note.transpose(note, '7M');
    result.push({
      Grau: 'II- de V/VI',
      Acorde: changeNote + 'm7b5',
      Notas: Chord.get(changeNote + 'm7b5').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7m', '6m', '2m']),
      Extenções: '(9, b13) <br>' +
        '(' + Note.transpose(changeNote, '2m') + ', ' + Note.transpose(changeNote, '6m') + ')',
      Cadência: changeNote + 'm7b5' + ' &#8594; ' +
        Note.transpose(changeNote, '4P') + '7 &#8594; ' +
        Note.transpose(changeNote, '7m') + 'm7',
      NotasExtendidas: '',
    });

    return result;
  }

  loadChords(chord: INotes) {
    this.tonalService.pushChord(chord);
  }
}
