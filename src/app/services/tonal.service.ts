import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Chord, Scale, Note } from 'tonal';
import { IInstruments } from './interfaces/instruments.interface';
import { INoteExtended } from './interfaces/notesExtended.interface';
import { Escalas } from './db/escalas.db';
import { INotes } from './interfaces/notes.interface';
import { IEscala } from './interfaces/escala.interface';

@Injectable({
  providedIn: 'root'
})
export class TonalService {

  // guarda o tom escolhido no combo
  private tonality = new BehaviorSubject<string[]>([]);
  currentTonality = this.tonality.asObservable();

  // guardando o modo Maior ou Menor
  private mode = new BehaviorSubject<string[]>([]);
  currentMode = this.mode.asObservable();

  // guarda o status da div que desenha os acordes
  private chord = new BehaviorSubject<INotes[]>([]);
  currentChord = this.chord.asObservable();

  // guarda o instrumento
  private instrument = new BehaviorSubject<IInstruments[]>([]);
  currentInstrument = this.instrument.asObservable();

  constructor() { }

  pushTonalityInit(tonality: string[]) {
    this.tonality.next(tonality);
  }

  pushTonality(tonality: string) {
    // gravando nova tonalidade
    const newTonality = this.tonality.value;
    newTonality.push(tonality);
    this.tonality.next(newTonality);
  }

  pushModeInit(mode: string[]) {
    this.mode.next(mode);
  }

  pushMode(mode: string) {
    const newMode = this.mode.value;
    newMode.push(mode);
    this.mode.next(newMode);
  }

  pushChordInit(chord: INoteExtended[]) {
    this.chord.next(chord);
  }

  pushChord(chord: INotes) {
    // gravando nova tonalidade
    const newChord = this.chord.value;
    newChord.push(chord);
    this.chord.next(newChord);
  }

  pushInstrumentIni(instrument: IInstruments[]) {
    this.instrument.next(instrument);
  }

  pushInstrument(instrument: string) {
    let selectedInstrument: IInstruments = { Name: '', Strings: [] };
    //alterar a linha comentada pela pesquisa em banco
    //selectedInstrument = Instruments.find(value => value.Name === instrument) as IInstruments;
    // gravando nova tonalidade
    const newInstrument = this.instrument.value;
    newInstrument.push(selectedInstrument);
    this.instrument.next(newInstrument);
  }
  /**
   * Outras funções
   */

  returnNotes(arrayNotes: string[]) {
    let notes = '';
    for (const iterator of arrayNotes) {
      notes += iterator + ', ';
    }
    return notes.substr(0, notes.length - 2);
  }

  returnExtended(note: string) {
    let result = '';
    for (const chord of Chord.extended(note)) {
      result += chord + ' <br>';
    }
    return result;
  }

  GetSeventhChord(notes: string[]) {
    let result = '';
    for (let index = 0; index < 4; index++) {
      result += notes[index] + ', ';
    }

    return result.substr(0, result.length - 2);
  }

  GetScales(note: string, scales: string[], acordes: string[], notas: string[]) {
    let reuslt = '';
    if (scales.length > 0) {
      for (const scale of scales) {
        reuslt += scale + this.GetScale(note, scale);
      }
    } else if (acordes.length > 0) {
      for (const acorde of acordes) {
        for (const escala of Escalas) {
          if (escala.Acordes.find(_ => _ === acorde)) {
            reuslt += escala.Nome + this.GetScale(note, escala.Nome);
          }
        }
      }
    } else if (notas.length > 0) {
      let temEscala = false;
      for (const escala of Escalas) {
        for (const nota of notas) {
          if (escala.Notas.find(_ => _ === nota) === undefined) {
            temEscala = false;
            break;
          } else {
            temEscala = true;
          }
        }
        if (temEscala) {
          reuslt += escala.Nome + this.GetScale(note, escala.Nome);
        }
      }
    }
    return reuslt;
  }

  GetScale(note: string, scala: string): string {
    let selectedScale: IEscala = Escalas.find(_ => _.Nome === scala) as IEscala;
    let result = '<br> (';
    for (const intervalo of selectedScale.Notas) {
      result += Note.transpose(note, intervalo) + ', ';
    }
    result = result.substr(0, result.length - 2) + ')';
    result += '<br>';
    return result;
  }

  GetScalesTotal(chord: string) {
    let result = '';
    for (const scale of Chord.chordScales(chord)) {
      result += scale + ' (';
      const notes = Scale.get(Chord.get(chord).tonic + ' ' + scale).notes;
      for (const note of notes) {
        result += note + ', ';
      }
      result = result.substr(0, result.length - 2);
      result += ') <br>';
    }

    return result.substr(0, result.length - 2);
  }

  GetExtended(note: string) {
    let result = '';
    for (const chord of Chord.extended(note)) {
      result += chord + ' (';
      const notes = Chord.get(chord).notes;
      for (const iterator of notes) {
        result += iterator + ', ';
      }
      result = result.substr(0, result.length - 2);
      result += ') <br>';
    }

    return result.substr(0, result.length - 2);
  }
}
