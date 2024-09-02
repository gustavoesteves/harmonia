import { existsSync, readFileSync } from 'fs';
import * as path from 'path';
import { readData } from './read';
import { IId } from './interface/id.interface';

export function updateData<T extends IId>(filePath: string, id: number, data: T[]): void {
    
}