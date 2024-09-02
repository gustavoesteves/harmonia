export interface ITessitura {
    alto: string
    altoOitava: number;
    baixo: string;
    baixoOitava: number;
}

export interface ISATB {
    voz: string;
    tessitura: ITessitura[];
}