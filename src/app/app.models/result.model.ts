import { Round } from "./round.model";

export interface Result {
    id: number;
    holeNumber: number;
    par: number;
    strokes: number;
    score: string;
    round: Round;
}