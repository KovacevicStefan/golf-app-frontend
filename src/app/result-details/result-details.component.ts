import { Component } from '@angular/core';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { UserService } from '../app.services/user/user.service';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';
import { Hole } from '../app.models/hole.model';
import { TournamentPlayer } from '../app.models/tournament.player.model';
import { User } from '../app.models/user.model';
import { Round } from '../app.models/round.model';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss',
})
export class ResultDetailsComponent {
  rounds?: Round[];
  holes: { [roundId: number]: Hole[] } = {};
  originalHoles: { [roundId: number]: Hole[] } = {};
  player?: TournamentPlayer;
  user?: User | null;
  isPlayerRegistered?: boolean;
  isEditable = false;
  buttonText = "Izmeni";

  scoreCategories = [
    { name: "Double-Eagle", color: "DOUBLE_EAGLE" },
    { name: "Eagle", color: "EAGLE" },
    { name: "Birdie", color: "BIRDIE" },
    { name: "Par", color: "PAR" },
    { name: "Bogey", color: "BOGEY" },
    { name: "Double-Bogey", color: "DOUBLE_BOGEY" },
    { name: "3+ Bogey", color: "THREE_PLUS_BOGEY" }
  ];

  constructor(private service: TournamentsService, private userService: UserService, private route: ActivatedRoute, private snackbar: SnackbarService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.getUserInfo();
      this.loadResult(id);
      this.loadTournamentPlayer(id);
    });
  }

  private loadResult(resultId: number): void {
    this.service.getRoundsByResultId(resultId).subscribe(rounds => {
      this.rounds = rounds;
      rounds.forEach(round => this.loadHolesForRound(round.id));
    });
  }

  private loadHolesForRound(roundId: number): void {
    this.service.getHolesByRoundId(roundId).subscribe(data => {
      const sorted = data.sort((a, b) => a.id - b.id);
      this.holes[roundId] = JSON.parse(JSON.stringify(sorted));
      this.originalHoles[roundId] = JSON.parse(JSON.stringify(sorted));
    });
  }

  private loadTournamentPlayer(resultId: number): void {
    this.service.getTournamentPlayerByResultId(resultId).subscribe(data => {
      this.player = data;
      this.isPlayerRegistered = data.playerUsername === this.user!.username;
    });
  }

  public getUserInfo() {
    this.userService.getProfileData().subscribe(data => {
      this.user = data;
    });
  }

  public saveHoles(): void {
    const requests: any = [];

    for (const roundId in this.holes) {
      this.holes[roundId].forEach(hole => {
        const holeDTO = { id: hole.id, par: hole.par, strokes: hole.strokes };
        requests.push(this.service.updateHole(holeDTO));
      });
    }

    if (requests.length) {
      forkJoin(requests).subscribe({
        next: () => {
          this.loadResult(this.player!.resultId);
          this.setEditable();
          this.snackbar.showSnackbar(`Uspesno ste azurirali rezultate!`);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error saving holes', error);
        }
      });
    }
  }

  public setEditable(): void {
    this.isEditable = !this.isEditable;
    if (!this.isEditable) {
      for (const roundId in this.originalHoles) {
        this.holes[roundId] = JSON.parse(JSON.stringify(this.originalHoles[roundId]));
      }
    }
    this.buttonText = this.isEditable ? "Otkaži izmene" : "Izmeni";
  }
}
