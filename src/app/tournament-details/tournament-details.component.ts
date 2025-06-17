import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { DialogService } from '../app.services/dialog/dialog.service';
import { UserService } from '../app.services/user/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Tournament } from '../app.models/tournament.model';
import { TournamentPlayer } from '../app.models/tournament.player.model';
import { User } from '../app.models/user.model';
import { Result } from '../app.models/result.model';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent implements OnInit, OnDestroy {

  tournament?: Tournament;
  players?: TournamentPlayer[];
  user?: User | null;
  showButton?: boolean;
  results?: any;

  private destroy$ = new Subject<void>();

  constructor(private service: TournamentsService, private userService: UserService, 
  private route: ActivatedRoute, private dialogService: DialogService) {}

  ngOnInit() {
    this.getRouteParams();

    this.dialogService.playerRegistered$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const tournamentId = this.tournament?.id;
        if (tournamentId) {
          this.getPlayers(tournamentId);
          this.getResultsForTable(tournamentId);
          this.showButton = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getRouteParams(): void {
    this.route?.params.subscribe((params) => {
      const id = +params['id'];
      this.getUserInfoAndPlayers(id);
      this.getTournament(id);
      this.getResultsForTable(id);
    });
  }

  public openDialog(tournament: any, user: any) {
    this.dialogService.showDialog(tournament, user);
  }

  public registerPlayerToTournament(playerId: number, tournamentId: number) {
    this.service.registerPlayerToTournament({ playerId, tournamentId }).subscribe(() => {
      this.getPlayers(tournamentId);
      this.getResultsForTable(tournamentId);
      this.showButton = false;
    });
  }

  public getTournament(id: number) {
    this.service.getTournamentById(id).subscribe(tournament => {
      this.tournament = tournament;
    });
  }

  public getPlayers(id: number) {
    this.service.getPlayersByTournamentId(id).subscribe(players => {
      this.players = players;
      const isAlreadyRegistered = players.some(player => player.playerId === this.user?.id);
      this.showButton = !isAlreadyRegistered;
    });
  }

  public getUserInfoAndPlayers(id: number) {
    this.userService.getProfileData().subscribe(data => {
      this.user = data;
      this.getPlayers(id);
    });
  }

  public getResultsForTable(id: number) {
    this.service.getResultsByTournament(id).subscribe((data: any[]) => {
      this.results = data;
    });
  }
}
