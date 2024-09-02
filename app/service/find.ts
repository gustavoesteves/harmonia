import { readData } from "./read";
import { IId } from "./interface/id.interface";

export function findData<T extends IId>(filePath: string, id: number): T | undefined {
    const data = readData<T>(filePath);
    return data.find(_ => _.id === id);
}