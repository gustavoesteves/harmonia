import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { INotes, INotesComplete } from '../../../../../services/interfaces/notes.interface';
import { TonalService } from '../../../../../services/tonal.service';
import { Note, Scale } from 'tonal';
import { IConfigMenu } from '../../../../../services/interfaces/menu.interface';

@Component({
  selector: 'app-dominante',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './dominante.component.html',
  styleUrl: './dominante.component.scss'
})
export class DominanteComponent {
  menuSelecionado: IConfigMenu[] = [
    { Name: 0, Status: "button primary fit small" },
    { Name: 1, Status: "button fit small" },
    { Name: 2, Status: "button fit small" },
    { Name: 3, Status: "button fit small" },
  ];
  menuOpcionais: IConfigMenu[] = [
    { Name: 0, Status: "button primary fit small" },
    { Name: 1, Status: "button fit small" },
    { Name: 2, Status: "button fit small" },
  ];
  header = ['Acorde', 'Notas', 'Escalas', 'Extenções'];
  acordeSus: INotes[] = [];
  primeiraOpcional: INotes[] = [];
  segundaOpcional: INotes[] = [];
  terceiraOpcional: INotes[] = [];
  alteredDominant: INotes[] = [];
  symetricDominant: INotes[] = [];

  constructor(private tonalService: TonalService, 
    private ngZone: NgZone
  ) { }

  changeMenu(menu: number) {
    for (let index = 0; index < this.menuSelecionado.length; index++) {
      if (menu === this.menuSelecionado[index].Name) {
        this.menuSelecionado[index].Status = "button primary fit small";
      } else {
        this.menuSelecionado[index].Status = "button fit small";
      }
    }
  }

  changeOpicionais(menu: number) {
    for (let index = 0; index < this.menuOpcionais.length; index++) {
      if (menu === this.menuOpcionais[index].Name) {
        this.menuOpcionais[index].Status = "button primary fit small";
      } else {
        this.menuOpcionais[index].Status = "button fit small";
      }
    }
  }

  ngOnInit() {
    this.tonalService.currentTonality.subscribe(value => {
      const note = value[value.length - 1];
      this.acordeSus = this.GetAcordeSus(note);
      this.primeiraOpcional = this.GetOptionalChords(note);
      this.segundaOpcional = this.GetSegundaOpcional(note);
      this.terceiraOpcional = this.GetTerceiraOpcional(note);
      this.alteredDominant = this.GetAlteredDominant(note);
      this.symetricDominant = this.GetSymetricDominant(note);
    });
  }

  GetAcordeSus(note: string) {
    const result: INotesComplete[] = [];
    // Fifth
    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (sus4)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m') + ', ' +
        Note.transpose(fifithNote, '4P'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '5P', '7m', '4P']),
      Extenções: '',
      NotasExtendidas: '',
      Cadência: ''
    });

    return result;
  }

  GetOptionalChords(note: string) {
    const result: INotesComplete[] = [];

    // Fifth
    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b9)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [
        'Frígio #3',
        'Mixolídio b2'], [], []),
      Extenções: '(9b) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '2m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [
        'Mixolídio',
        'Mixolídio #4'], [], []),
      Extenções: '(13) <br>' +
        '(' + Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b9 13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [
        'Mixolídio b2'], [], []),
      Extenções: '(9b, 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    return result;
  }

  GetSegundaOpcional(note: string) {
    const result: INotesComplete[] = [];

    // Fifth
    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [
        'Eólio #3',
        'Frígio #3'], [], []),
      Extenções: '(13b) <br>' +
        '(' + Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b9 b13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [
        'Frígio #3'], [], []),
      Extenções: '(9b 13b) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    return result;
  }

  GetTerceiraOpcional(note: string) {
    const result: INotesComplete[] = [];

    // Fifth
    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (#9)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '3m']),
      Extenções: '(9#) <br>' +
        '(' + Note.transpose(fifithNote, '2A') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '2A'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b9 #9)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '3m']),
      Extenções: '(b9 #9) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '2A') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '2A'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (#9 b13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '3m', '6m']),
      Extenções: '(#9 b13) <br>' +
        '(' + Note.transpose(fifithNote, '2A') + ', ' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2A') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7 (b9 #9 b13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '3m', '6m']),
      Extenções: '(b9 #9 b13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '2A') + ', ' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '2A') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    return result;
  }

  GetAlteredDominant(note: string) {
    const result: INotesComplete[] = [];

    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d']),
      Extenções: '',
      NotasExtendidas: '',
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(b9)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '2m']),
      Extenções: '(b9) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '2m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(#9)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '3m']),
      Extenções: '(#9) <br>' +
        '(' + Note.transpose(fifithNote, '2A') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '2A'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(b13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '6m']),
      Extenções: '(b13) <br>' +
        '(' + Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas: Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(b9 #9)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '2m', '3m']),
      Extenções: '(b9 #9) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '3m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '3m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(b9 b13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '2m', '6m']),
      Extenções: '(b9 #9) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(#9 b13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '3m', '6m']),
      Extenções: '(b9 #9) <br>' +
        '(' + Note.transpose(fifithNote, '3m') + ',' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7b5(b9 #9 b13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5d') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5d', '2m', '3m', '6m']),
      Extenções: '(b9 #9 b13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '6m') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '6m'),
      Cadência: ''
    });

    return result;
  }

  GetSymetricDominant(note: string) {
    const result: INotesComplete[] = [];
    // V7(b9 13), V7(#9 13), V7(#11 13), V7(9b #9 13), V7(#9 #11 13), V7(9b #9 #11 13)

    // Fifth
    const fifithNote = Note.transpose(note, '5P');
    result.push({
      Grau: '',
      Acorde: fifithNote + '7(b9 13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '2m', '6M']),
      Extenções: '(b9 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7(#9 13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '3m', '6M']),
      Extenções: '(#9 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7(#11 13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '4A', '6M']),
      Extenções: '(#11 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7(b9 #9 13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '2m', '3m', '6M']),
      Extenções: '(b9 #9 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7(#9 #11 13)',
      Notas:
        fifithNote + ',' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '4A', '3m', '6M']),
      Extenções: '(#9 #11 13) <br>' +
        '(' + Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '4A') + ', ' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '4A') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    result.push({
      Grau: '',
      Acorde: fifithNote + '7(b9 #9 #11 13)',
      Notas:
        fifithNote + ', ' +
        Note.transpose(fifithNote, '3M') + ', ' +
        Note.transpose(fifithNote, '5P') + ', ' +
        Note.transpose(fifithNote, '7m'),
      Escalas: this.tonalService.GetScales(fifithNote, [], [], ['3M', '7m', '5P', '2m', '3m', '4A', '6M']),
      Extenções: '(b9 #9 #11 13) <br>' +
        '(' + Note.transpose(fifithNote, '2m') + ',' +
        Note.transpose(fifithNote, '3m') + ',' +
        Note.transpose(fifithNote, '4A') + ',' +
        Note.transpose(fifithNote, '6M') + ')',
      NotasExtendidas:
        Note.transpose(fifithNote, '2m') + ', ' +
        Note.transpose(fifithNote, '3m') + ', ' +
        Note.transpose(fifithNote, '4A') + ', ' +
        Note.transpose(fifithNote, '6M'),
      Cadência: ''
    });

    return result;
  }

  GetLocalScale(note: string, chord: string) {
    let result = '';
    for (const scales of Scale.extended(chord)) {
      for (const notes of Scale.get(note + ' ' + scales).notes) {
        result += notes + ', ';
      }
      result += result.substr(0, result.length - 2) + '<br>';
    }
    return '';
  }
}