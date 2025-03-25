import { Component } from '@angular/core';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tournament-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss'
})
export class TournamentDetailsComponent {

  tournament?: any;
  players?: any[];
  private storedUser = localStorage.getItem("authUser");
  user = this.storedUser ? JSON.parse(this.storedUser) : null;

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

  public registerPlayerToTournament(playerId: number, tournamentId: number) {
    window.alert("Da li stvarno zelis da se prijavis na turnir?");
    return this.service.registerPlayerToTournament({ playerId, tournamentId }).subscribe(() => {
      window.location.reload();
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
