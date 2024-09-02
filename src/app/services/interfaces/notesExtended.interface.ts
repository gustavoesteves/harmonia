import { INotes } from './notes.interface';

export interface INoteExtended extends INotes {
    Roman: string;
    Acordes: string[];
}
