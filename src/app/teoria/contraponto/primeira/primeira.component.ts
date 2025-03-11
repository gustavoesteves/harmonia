import { Component, ElementRef, ViewChild } from '@angular/core';
import { Interval, Scale, Note } from 'tonal';
import * as Vex from 'vexflow';
import * as Tone from 'tone';

type MusicalPhrase = string[];

@Component({
  selector: 'app-primeira',
  standalone: true,
  imports: [],
  templateUrl: './primeira.component.html',
  styleUrl: './primeira.component.scss'
})
export class PrimeiraComponent {
  @ViewChild('rendererContainer', { static: true }) rendererContainer!: ElementRef;

  private consonantIntervals: string[] = [
    "1P",  // uníssono (apenas início e fim)
    "3M",  // terça maior
    "5P",  // quinta justa
    "6M",  // sexta maior
    "8P"   // oitava
  ];

  constructor() { }

  ngOnInit(): void {
    const cantusFirmus = this.generateCantusFirmus('C major');
    console.log("Cantus Firmus gerado:", cantusFirmus.join(" - "));
    const counterpoint = this.generateCounterpoint(cantusFirmus, 'C major');
    console.log("Contraponto gerado:", counterpoint.join(" - "));
    this.renderScore(cantusFirmus, counterpoint);
    this.playScore(cantusFirmus, counterpoint);
  }

  private calculateInterval(note1: string, note2: string): string {
    return Interval.distance(note1, note2);
  }

  private isConsonant(interval: string, isFirst: boolean, isLast: boolean): boolean {
    const normalizedInterval = interval.startsWith('-') ? interval.slice(1) : interval;
    console.log(`Intervalo calculado: ${interval}, Normalizado: ${normalizedInterval}`);
    if (normalizedInterval === "1P") {
      return isFirst || isLast;
    }
    return this.consonantIntervals.includes(normalizedInterval) || normalizedInterval === "4P";
  }

  private hasForbiddenParallels(
    cf: MusicalPhrase,
    cp: MusicalPhrase,
    index: number
  ): boolean {
    if (index === 0) return false;
    const currentInterval = this.calculateInterval(cf[index], cp[index]);
    const previousInterval = this.calculateInterval(cf[index - 1], cp[index - 1]);
    return (
      (currentInterval === "5P" || currentInterval === "8P") &&
      currentInterval === previousInterval
    );
  }

  private generateCantusFirmus(key: string, length: number = 8, attempts: number = 0): MusicalPhrase {
    const maxAttempts = 10;
    if (attempts >= maxAttempts) {
      throw new Error("Não foi possível gerar um Cantus Firmus válido após várias tentativas");
    }

    const scale = Scale.get(key);
    const pitchNames = scale.notes.map(note => Note.get(note).name);
    const contraltoRange = ["G3", "A3", "B3", "C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5"];
    const validNotes = contraltoRange.filter(note => pitchNames.includes(note.slice(0, -1)));
    const cantusFirmus: MusicalPhrase = [];
    const tonic = scale.tonic + "4"; // C4
    const dominant = "G4"; // V
    const leadingTone = "B4"; // VII

    cantusFirmus.push(tonic);

    for (let i = 1; i < length - 2; i++) {
      const prevNote = cantusFirmus[i - 1];
      const possibleNextNotes = validNotes.filter((note) => {
        const intervalSemitones = Interval.semitones(Interval.distance(prevNote, note));
        return (
          intervalSemitones !== undefined &&
          intervalSemitones <= 7 &&
          note !== prevNote &&
          (i < 2 || Interval.distance(cantusFirmus[i - 2], prevNote) !== Interval.distance(prevNote, note))
        );
      });
      if (possibleNextNotes.length === 0) {
        console.log(`Nenhuma nota válida para Cantus Firmus na posição ${i}. Tentando novamente...`);
        return this.generateCantusFirmus(key, length, attempts + 1);
      }
      const randomIndex = Math.floor(Math.random() * possibleNextNotes.length);
      cantusFirmus.push(possibleNextNotes[randomIndex]);
    }

    const penultOptions = [dominant, leadingTone];
    cantusFirmus.push(penultOptions[Math.floor(Math.random() * penultOptions.length)]);
    cantusFirmus.push(tonic);

    return cantusFirmus;
  }

  private generateCounterpointRecursive(
    cantusFirmus: MusicalPhrase,
    counterpoint: MusicalPhrase,
    position: number,
    possibleNotes: string[],
    key: string
  ): MusicalPhrase | null {
    if (position === cantusFirmus.length) {
      return counterpoint;
    }

    const isFirst = position === 0;
    const isLast = position === cantusFirmus.length - 1;
    const scale = Scale.get(key);
    let notesToTry = possibleNotes;

    console.log(`Posição ${position}: Cantus = ${cantusFirmus[position]}, Contraponto = ${counterpoint.join(" - ")}`);

    if (isFirst) {
      const tonic = scale.tonic + "4"; // C4 (elevado de C3)
      const fifth = Note.transpose(tonic, "5P"); // G4 (elevado de G3)
      notesToTry = [fifth, tonic];
    } else if (isLast) {
      const tonic = scale.tonic + "4"; // C4 (elevado de C3)
      notesToTry = [tonic];
    }

    for (const note of notesToTry) {
      const interval = this.calculateInterval(cantusFirmus[position], note);
      const semitonesFromCantus = Interval.semitones(interval) || 0;
      const prevNote = position > 0 ? counterpoint[position - 1] : null;
      const jumpSemitones = prevNote ? Interval.semitones(Interval.distance(prevNote, note)) || 0 : 0;
      const isOctaveJump = jumpSemitones === 12;
      const prevJump = position > 1 ? Interval.semitones(Interval.distance(counterpoint[position - 2], counterpoint[position - 1])) || 0 : 0;
      const directionChanged = prevJump !== 0 && (jumpSemitones * prevJump < 0);

      const isValid = (
        semitonesFromCantus <= 16 &&
        this.isConsonant(interval, isFirst, isLast) &&
        !this.hasForbiddenParallels(cantusFirmus, [...counterpoint, note], position) &&
        (position === 0 || jumpSemitones <= 7 || (isOctaveJump && directionChanged)) &&
        (position === 0 || note !== prevNote) &&
        (position < 2 || Interval.distance(counterpoint[position - 2], counterpoint[position - 1]) !== Interval.distance(counterpoint[position - 1], note))
      );

      if (!isValid) {
        console.log(`Nota ${note} rejeitada. Razões: ${semitonesFromCantus > 16 ? "Décima excedida" : ""} ${!this.isConsonant(interval, isFirst, isLast) ? "Não consonante" : ""} ${this.hasForbiddenParallels(cantusFirmus, [...counterpoint, note], position) ? "Paralelas proibidas" : ""} ${position > 0 && jumpSemitones > 7 && !(isOctaveJump && directionChanged) ? "Salto > quinta" : ""} ${position > 0 && note === prevNote ? "Repetição" : ""} ${position >= 2 && Interval.distance(counterpoint[position - 2], counterpoint[position - 1]) === Interval.distance(counterpoint[position - 1], note) ? "Saltos consecutivos" : ""}`);
        continue;
      }

      const result = this.generateCounterpointRecursive(
        cantusFirmus,
        [...counterpoint, note],
        position + 1,
        possibleNotes,
        key
      );
      if (result) return result;
    }

    console.log(`Nenhuma nota válida na posição ${position} para ${cantusFirmus[position]}. Opções testadas: ${notesToTry.join(", ")}`);
    return null;
  }

  private generateCounterpoint(cantusFirmus: MusicalPhrase, key: string, attempts: number = 0): MusicalPhrase {
    const maxAttempts = 10;
    if (attempts >= maxAttempts) { // Corrigido de 'attempt' para 'attempts'
      throw new Error("Não foi possível gerar um contraponto válido após várias tentativas");
    }

    const scale = Scale.get(key);
    const tenorRange = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5", "G5", "A5"];
    const possibleNotes = tenorRange.filter(note => scale.notes.includes(note.slice(0, -1)));
    const result = this.generateCounterpointRecursive(cantusFirmus, [], 0, possibleNotes, key);

    if (!result) {
      console.log("Falha ao gerar contraponto. Tentando novamente com novo Cantus Firmus...");
      return this.generateCounterpoint(this.generateCantusFirmus(key), key, attempts + 1);
    }
    return result;
  }

  private renderScore(cantusFirmus: MusicalPhrase, counterpoint: MusicalPhrase): void {
    const VF = Vex.Flow;
    const div = this.rendererContainer.nativeElement;
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    const staveWidth = 100;
    const totalWidth = staveWidth * cantusFirmus.length + 20;
    renderer.resize(totalWidth, 400);
    const context = renderer.getContext();
    context.setFillStyle("#000");
    context.setStrokeStyle("#000");

    const measures = cantusFirmus.length;
    const stavesTop: InstanceType<typeof Vex.Flow.Stave>[] = [];
    const stavesBottom: InstanceType<typeof Vex.Flow.Stave>[] = [];
    let xPosition = 10;

    for (let i = 0; i < measures; i++) {
      const staveTop = new VF.Stave(xPosition, 40, staveWidth);
      const staveBottom = new VF.Stave(xPosition, 140, staveWidth);

      if (i === 0) {
        staveTop.addClef("treble").addTimeSignature("4/4");
        staveBottom.addClef("treble", "default", "8vb").addTimeSignature("4/4");
      }

      staveTop.setContext(context).draw();
      staveBottom.setContext(context).draw();

      stavesTop.push(staveTop);
      stavesBottom.push(staveBottom);
      xPosition += staveWidth;
    }

    const cantusNotes = cantusFirmus.map(note => {
      const [pitch, octave] = [note.slice(0, -1), note.slice(-1)];
      return new VF.StaveNote({ clef: "treble", keys: [`${pitch}/${octave}`], duration: "w" });
    });

    const counterpointNotes = counterpoint.map(note => {
      const [pitch, octave] = [note.slice(0, -1), note.slice(-1)];
      return new VF.StaveNote({ clef: "treble", keys: [`${pitch}/${octave}`], duration: "w" });
    });

    for (let i = 0; i < measures; i++) {
      const cantusMeasureNotes = [cantusNotes[i]];
      const counterpointMeasureNotes = [counterpointNotes[i]];

      const voiceTop = new VF.Voice({ num_beats: 4, beat_value: 4 });
      voiceTop.addTickables(cantusMeasureNotes);

      const voiceBottom = new VF.Voice({ num_beats: 4, beat_value: 4 });
      voiceBottom.addTickables(counterpointMeasureNotes);

      const formatter = new VF.Formatter()
        .joinVoices([voiceTop])
        .joinVoices([voiceBottom])
        .format([voiceTop, voiceBottom], staveWidth - 20);

      voiceTop.draw(context, stavesTop[i]);
      voiceBottom.draw(context, stavesBottom[i]);
    }
  }

  private async playScore(cantusFirmus: MusicalPhrase, counterpoint: MusicalPhrase): Promise<void> {
    await Tone.start();

    const synthCantus = new Tone.Synth().toDestination();
    const synthCounterpoint = new Tone.Synth().toDestination();

    const now = Tone.now();
    const noteDuration = 1; // 1 segundo por nota

    cantusFirmus.forEach((note, index) => {
      synthCantus.triggerAttackRelease(note, "4n", now + index * noteDuration);
    });

    counterpoint.forEach((note, index) => {
      synthCounterpoint.triggerAttackRelease(note, "4n", now + index * noteDuration);
    });
  }
}