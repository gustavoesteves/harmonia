import { Component, NgZone } from '@angular/core';
import { TonalService } from '../../../../../services/tonal.service';
import { INotes, INotesComplete } from '../../../../../services/interfaces/notes.interface';
import { Chord, Note } from 'tonal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diminuto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diminuto.component.html',
  styleUrl: './diminuto.component.scss'
})
export class DiminutoComponent {
  header = ['Grau', 'Acorde', 'Notas', 'Extenções', 'Cadência'];
  diminishedChords: INotesComplete[] = [];

  constructor(private tonalService: TonalService, private ngZone: NgZone) { }

  ngOnInit() {
    this.tonalService.currentTonality.subscribe(value => {
      const note = value[value.length - 1];
      this.ngZone.run(() => {
        this.diminishedChords = this.GetDiminishedChords(note);
      });
    });
  }

  GetDiminishedChords(note: string) {
    const result: INotesComplete[] = [];
    let changeNote = '';

    // #I°7 (I#dim7)
    changeNote = Note.transpose(note, '1A');
    result.push({
      Grau: '#I°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['1A', '3m', '5d', '7d']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '2M') + 'm7'
    });

    // #II°7 (II#dim7)
    changeNote = Note.transpose(note, '2A');
    result.push({
      Grau: '#II°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '3M') + 'm7'
    });
    
    // #IV°7 (IV#dim7)
    changeNote = Note.transpose(note, '4A');
    result.push({
      Grau: '#IV°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '1P') + '/' + Note.transpose(note, '5P')
    });

    // #V°7 (V#dim7)
    changeNote = Note.transpose(note, '5A');
    result.push({
      Grau: '#V°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '6M') + 'm7'
    });

    // bIII°7 (IIIbdim7)
    changeNote = Note.transpose(note, '3m');
    result.push({
      Grau: 'bIII°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '2M') + 'm7'
    });

    // bVI°7 (VIbdim7)
    changeNote = Note.transpose(note, '6m');
    result.push({
      Grau: 'bVI°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '5P') + 'm7'
    });

    // I°7 (Idim7)
    changeNote = note;
    result.push({
      Grau: 'I°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '1P') + '6M'
    });

    // V°7 (Vdim7)
    changeNote = Note.transpose(note, '5P');
    result.push({
      Grau: 'V°7',
      Acorde: changeNote + 'dim7',
      Notas: Chord.get(changeNote + 'dim7').notes.toString(),
      Escalas: this.tonalService.GetScales(changeNote, [], [], ['3m', '5d', '7d', '1A']),
      Extenções: 'b9 (' + Note.transpose(changeNote, '2m') + ')',
      NotasExtendidas: '',
      Cadência: changeNote + 'dim7 → ' + Note.transpose(note, '5P') + '7'
    });

    return result;
  }

  loadChords(chord: INotes) {
    this.tonalService.pushChord(chord);
  }
}