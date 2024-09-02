import { existsSync, readFileSync } from 'fs';
import * as path from 'path';

export function readData<T>(filePath: string): T[] {
    const data = readFileSync(path.join(__dirname, '../db/' + filePath), 'utf8');
    return JSON.parse(data);
}