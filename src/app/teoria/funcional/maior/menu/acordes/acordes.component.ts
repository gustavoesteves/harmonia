import { Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from 'tonal';
import { TonalService } from '../../../../../services/tonal.service';
import { INotes, INotesComplete } from '../../../../../services/interfaces/notes.interface';

@Component({
  selector: 'app-acordes',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './acordes.component.html',
  styleUrl: './acordes.component.scss'
})
export class AcordesComponent {
  header = ['Grau', 'Acorde', 'Notas', 'Escalas', 'Extenções'];
  majorMode: INotesComplete[] = [];

  constructor(private tonalService: TonalService,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    this.tonalService.currentTonality.subscribe(value => {
      const note = value[value.length - 1];
      this.ngZone.run(() => {
        this.majorMode = this.GetMajorMode(note);
      });
    });
  }

  GetMajorMode(note: string) {
    const majorMode: INotesComplete[] = [];
    let chordNote = '';

    // Imaj7
    majorMode.push({
      Grau: 'I',
      Acorde: note + 'maj7',
      Notas:
        Note.transpose(note, '1P') + ', ' +
        Note.transpose(note, '3M') + ', ' +
        Note.transpose(note, '5P') + ', ' +
        Note.transpose(note, '7M'),
      Escalas: this.tonalService.GetScales(note, ['Jônico'], [], []),
      Extenções: '(9, 13) <br>' + '(' + Note.transpose(note, '2M') + ', ' + Note.transpose(note, '6M') + ')',
      NotasExtendidas: Note.transpose(note, '2M') + ', ' + Note.transpose(note, '6M'),
      Cadência: ''
    });

    // IIm7
    chordNote = Note.transpose(note, '2M');
    majorMode.push({
      Grau: 'II-',
      Acorde: chordNote + 'm7',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3m') + ', ' +
        Note.transpose(chordNote, '5P') + ', ' +
        Note.transpose(chordNote, '7m'),
      Escalas: this.tonalService.GetScales(chordNote, ['Dórico'], [], []),
      Extenções: '(9, 11) <br>' + '(' + Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '4M') + ')',
      NotasExtendidas: Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '4M'),
      Cadência: ''
    });

    // IIIm7
    chordNote = Note.transpose(note, '3M');
    majorMode.push({
      Grau: 'III-',
      Acorde: chordNote + 'm7',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3m') + ', ' +
        Note.transpose(chordNote, '5P') + ', ' +
        Note.transpose(chordNote, '7m'),
      Escalas: this.tonalService.GetScales(chordNote, ['Frígio'], [], []),
      Extenções: '(11) <br>' + '(' + Note.transpose(chordNote, '4M') + ')',
      NotasExtendidas: Note.transpose(chordNote, '4M'),
      Cadência: ''
    });

    // IVmaj7
    chordNote = Note.transpose(note, '4M');
    majorMode.push({
      Grau: 'IV',
      Acorde: chordNote + 'maj7',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3M') + ', ' +
        Note.transpose(chordNote, '5P') + ', ' +
        Note.transpose(chordNote, '7M'),
      Escalas: this.tonalService.GetScales(chordNote, ['Lídio'], [], []),
      Extenções: '(9, #11, 13) <br>' + '(' + Note.transpose(chordNote, '2M') + ', ' +
        Note.transpose(chordNote, '4A') + ', ' + Note.transpose(chordNote, '6M') + ')',
      NotasExtendidas: Note.transpose(chordNote, '2M') + ', ' +
        Note.transpose(chordNote, '4A') + ', ' + Note.transpose(chordNote, '6M'),
      Cadência: ''
    });

    // V7
    chordNote = Note.transpose(note, '5M');
    majorMode.push({
      Grau: 'V',
      Acorde: chordNote + '7',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3M') + ', ' +
        Note.transpose(chordNote, '5P') + ', ' +
        Note.transpose(chordNote, '7m'),
      Escalas: this.tonalService.GetScales(chordNote, ['Mixolídio'], [], []),
      Extenções: '(9, 13) <br>' + '(' + Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '6M') + ')',
      NotasExtendidas: Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '6M'),
      Cadência: ''
    });

    // VIm7
    chordNote = Note.transpose(note, '6M');
    majorMode.push({
      Grau: 'VI-',
      Acorde: chordNote + 'm7',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3m') + ', ' +
        Note.transpose(chordNote, '5P') + ', ' +
        Note.transpose(chordNote, '7m'),
      Escalas: this.tonalService.GetScales(chordNote, ['Eólio'], [], []),
      Extenções: '(9, 11) <br>' + '(' + Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '4M') + ')',
      NotasExtendidas: Note.transpose(chordNote, '2M') + ', ' + Note.transpose(chordNote, '4M'),
      Cadência: ''
    });

    // VIm7
    chordNote = Note.transpose(note, '7M');
    majorMode.push({
      Grau: 'VII- b5',
      Acorde: chordNote + 'm7b5',
      Notas:
        Note.transpose(chordNote, '1P') + ', ' +
        Note.transpose(chordNote, '3m') + ', ' +
        Note.transpose(chordNote, '5d') + ', ' +
        Note.transpose(chordNote, '7m'),
      Escalas: this.tonalService.GetScales(chordNote, ['Lócrio'], [], []),
      Extenções: '(11, b13) <br>' + '(' + Note.transpose(chordNote, '4M') + ', ' + Note.transpose(chordNote, '6m') + ')',
      NotasExtendidas: Note.transpose(chordNote, '4M') + ', ' + Note.transpose(chordNote, '6m'),
      Cadência: ''
    });

    return majorMode;
  }

  loadChords(chord: INotes) {
    this.tonalService.pushChord(chord);
  }
}
