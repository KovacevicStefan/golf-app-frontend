import { Strokes } from "./strokes.model";

export interface Result {
    resultId: number;
    username: string,
    totalPar: number;
    totalStrokes: number;
    roundResults: Strokes[]
}