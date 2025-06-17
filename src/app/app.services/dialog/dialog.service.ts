import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TournamentsService } from '../tournaments/tournaments.service';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private tournament = new BehaviorSubject<any | null>(null);
  private user = new BehaviorSubject<any | null>(null);

  tournament$ = this.tournament.asObservable();
  user$ = this.user.asObservable();

  private playerRegistered = new Subject<void>();
  playerRegistered$ = this.playerRegistered.asObservable();
  
  constructor(private service: TournamentsService, private snackbarService: SnackbarService) {}

  showDialog(tournament: any, user: any) {
    this.tournament.next(tournament);
    this.user.next(user);
  }

  hideDialog() {
    this.user.next(null);
    this.tournament.next(null);
  }

  public registerPlayerToTournament(playerId: number, tournamentId: number) {
    return this.service.registerPlayerToTournament({ playerId, tournamentId }).subscribe(() => {
      this.snackbarService.showSnackbar("Uspesno ste se prijavili na turnir!");
      this.playerRegistered.next();
      this.hideDialog();
    });
  }
}
