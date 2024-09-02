import { writeFileSync } from "fs";
import * as path from 'path';

export function writeData<T>(filePath: string, data: T[]): void {
    writeFileSync(path.join(__dirname, '../db/' + filePath), JSON.stringify(data, null, 2), 'utf8');
}