import { Component, ViewChild } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { User } from '../app.models/user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {

  profileData?: User;
  userTournaments?: any[];
  tournamentResults: { [resultId: number]: any } = {};

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private tournamentService: TournamentsService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const username = params['username'];
      this.loadData(username);
      this.loadPlayerTournaments(username);
    });
  }

  public loadData(username: string) {
    this.service.getUserByUsername(username).subscribe((data) => {
      this.profileData = data;
    });
  }

  public loadPlayerTournaments(username: string) {
    this.tournamentService.getTournamentsByPlayerUsername(username).subscribe((data) => {
      this.userTournaments = data;
      this.userTournaments.forEach((tournament) => {
        this.loadTournamentResult(tournament.resultId);
      });
    });
  }

  public loadTournamentResult(resultId: number) {
    this.tournamentService.getResultsByRounds(resultId).subscribe((data) => {
      this.tournamentResults[resultId] = data;
    });
  }

}
