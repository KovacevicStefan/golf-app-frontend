import { Component } from '@angular/core';
import { Tournament } from '../app.models/tournament.model';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TournamentPlayer } from '../app.models/tournament.player.model';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent {

  tournament?: any;
  players?: any[];

  constructor(private service: TournamentsService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getRouteParams();
  }

  private getRouteParams(): void {
    this.route?.params.subscribe((params) => {
      const id = params['id'];
      this.getTournament(id);
      this.getPlayers(id);
    });
  }

  public getTournament(id: number) {
    this.service?.getTournamentById(id).subscribe(tournament => {
      this.tournament = tournament;
    });
  }

  public getPlayers(id: number) {
    this.service?.getPlayersByTournamentId(id).subscribe(players => {
      this.players = players;
    });
  }

  public playerProfile(username: string) {
    window.location.href = `/profile/${username}`;
  }

}
