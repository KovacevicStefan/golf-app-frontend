import { Tournament } from "./tournament.model";
import { User } from "./user.model";

export interface TournamentPlayer {
    id: number;
    tournament: Tournament;
    player: User;
    dateJoined: Date;
}