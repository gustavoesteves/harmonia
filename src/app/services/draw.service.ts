import { Injectable } from '@angular/core';
import { ITranslate } from './interfaces/translate.interface';
import { Chord } from 'tonal';

@Injectable({
    providedIn: 'root'
})
export class DrawService {

    constructor() { }

    GetNotes(chord: string): Array<string> {
        const result: Array<string> = [];
        if (chord.indexOf('/') > 0 && chord.indexOf('6') < 0) {
            const inversion: Array<string> = [];
            if (chord.indexOf('m') > 0) {
                // tratamento para acordes invertidos menores
                for (const note of Chord.get(chord.substr(chord.length - 2, 2)).notes) {
                    inversion.push(note);
                }
                result.push(chord.substr(chord.length - 4, 1));
                for (const note of inversion) {
                    if (result[0] !== note) {
                        result.push(note);
                    }
                }
            }
            else {
                // tratamento para acordes invertidos maiores
                for (const note of Chord.get(chord.substr(chord.length - 1, 1)).notes) {
                    inversion.push(note);
                }
                result.push(chord.substr(chord.length - 3, 1));
                for (const note of inversion) {
                    if (result[0] !== note) {
                        result.push(note);
                    }
                }
            }
        } else {
            // acordes sem inversão
            for (const note of Chord.get(chord).notes) {
                result.push(note);
            }
        }
        return result;
    }

    GetTranslate(chord: any): ITranslate {
        const result: ITranslate = { Chord: [], Position: chord.barre };

        // criando array invertido das notas do acorde
        let newChord: string[] = [];
        let chordPosition = chord.positionString;
        if (chordPosition.indexOf('-') > 0) {
            while (chordPosition.indexOf('-') > 0) {
                const notePlace = chordPosition.substr(chordPosition.lastIndexOf('-') + 1,
                    chordPosition.length - chordPosition.lastIndexOf('-') - 1);
                newChord.push(notePlace);
                chordPosition = chordPosition.substr(0, chordPosition.lastIndexOf('-'));
            }
            newChord.push(chordPosition);
        } else {
            newChord = chord.positionString.split('').reverse();
        }

        // verificando se acorde tem posicao depois da casa 5
        let positionFive = false;
        for (const position of newChord) {
            if (Number(position) > 5) { positionFive = true; }
        }

        // verificando se acorde tem posicao depois da casa 5 e na casa 5 tambem
        let haveFive = false;
        for (const position of newChord) {
            if (positionFive && Number(position) === 5) { haveFive = true; }
        }

        // verificando se acorde precisa de barra
        let barre = 0;
        let positionBarre = 0;
        for (const position of newChord) {
            if (Number(position) > 5 && Number(position) > barre) { barre = Number(position); }
        }
        if (barre > 0) {
            result.Position = barre - 4;
            positionBarre = barre - 5;
        } else {
            result.Position = 0;
        }

        // recalculando valor das posicoes do acorde
        let index = 1;
        for (const position of newChord) {
            if (Number(position) > 0 && position !== 'x') {
                result.Chord.push([index, Number(position) - positionBarre]);
            } else {
                result.Chord.push([index, position]);
            }
            index++;
        }

        return result;
    }
}