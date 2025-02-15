import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { User } from '../app.models/user.model';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [UserService]
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
    this.getRouteParams();
  }

  private getRouteParams(): void {
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

  public details(id: number): void {
    window.location.href = `/turniri/${id}`;
  }
}
