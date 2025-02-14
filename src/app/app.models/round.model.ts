import { TournamentPlayer } from "./tournament.player.model";

export interface Round {
    id: number;
    roundNumber: number;
    holes: number;
    tournamentPlayer: TournamentPlayer;
}