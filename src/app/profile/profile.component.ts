import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { User } from '../app.models/user.model';
import { ActivatedRoute } from '@angular/router';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { CommonModule } from '@angular/common';
import { Result } from '../app.models/result.model';

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
  results?: Result[];
  roundResults: { [resultId: number]: any[] } = {};
  totalStrokes?: number = 0;

  constructor(
    private service: UserService,
    private route: ActivatedRoute,
    private tournamentService: TournamentsService
  ) { }

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
    this.service.getUserByUsername(username).subscribe(data => {
      this.profileData = data;
    });
  }

  public loadPlayerTournaments(username: string) {
    this.tournamentService.getTournamentsByPlayerUsername(username).subscribe(data => {
      this.userTournaments = data;
      this.userTournaments.forEach((tournament) => {
        this.loadResultsByRound(tournament.resultId);
      })
    });
  }

  public loadResultsByRound(resultId: number) {
    this.tournamentService.getResultsByRounds(resultId).subscribe(data => {
      this.roundResults[resultId] = data;

      for(let result of this.roundResults[resultId]) {
        this.totalStrokes += result.totalStrokes;
      }
    });
  }

}
