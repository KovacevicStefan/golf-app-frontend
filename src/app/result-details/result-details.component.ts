import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { TournamentsService } from '../app.services/tournaments/tournaments.service';
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
  buttonText = 'Izmeni';
  loading = false;

  scoreCategories = [
    { name: 'Double-Eagle', color: 'DOUBLE_EAGLE' },
    { name: 'Eagle', color: 'EAGLE' },
    { name: 'Birdie', color: 'BIRDIE' },
    { name: 'Par', color: 'PAR' },
    { name: 'Bogey', color: 'BOGEY' },
    { name: 'Double-Bogey', color: 'DOUBLE_BOGEY' },
    { name: '3+ Bogey', color: 'THREE_PLUS_BOGEY' }
  ];

  constructor(
    private service: TournamentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const resultId = +params['id'];
      this.getUserInfo();
      this.loadResult(resultId);
      this.loadTournamentPlayer(resultId);
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
      this.holes[roundId] = structuredClone(sorted);
      this.originalHoles[roundId] = structuredClone(sorted);
    });
  }

  private loadTournamentPlayer(resultId: number): void {
    this.service.getTournamentPlayerByResultId(resultId).subscribe(data => {
      this.player = data;
      this.isPlayerRegistered = data.playerUsername === this.user?.username;
    });
  }

  private getUserInfo(): void {
    this.userService.getProfileData().subscribe(data => {
      this.user = data;
    });
  }

  public saveHoles(): void {

    const holesToUpdate = this.collectHolesToUpdate();

    if (!holesToUpdate.length) {
      this.snackbar.showSnackbar('Nema izmena za čuvanje.');
      return;
    }

    this.loading = true;

    this.service.updateHoles(holesToUpdate).subscribe({
      next: (updatedHoles: Hole[]) => {
        this.applyUpdatesToLocalState(updatedHoles);
        this.syncOriginalState();
        this.setEditable();
        this.loading = false;
        this.snackbar.showSnackbar('Uspešno ste ažurirali rezultate!');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error saving holes', error);
        this.loading = false;
        this.snackbar.showSnackbar('Greška prilikom čuvanja rezultata');
      }
    });
  }

  private collectHolesToUpdate(): any[] {
    const result: any[] = [];

    Object.values(this.holes).forEach(roundHoles => {
      roundHoles.forEach(hole => {
        if (hole.strokes !== null && hole.strokes !== undefined) {
          result.push({
            id: hole.id,
            par: hole.par,
            strokes: hole.strokes
          });
        }
      });
    });

    return result;
  }

  private applyUpdatesToLocalState(updatedHoles: Hole[]): void {
    updatedHoles.forEach(updated => {
      const roundHoles = this.holes[updated.roundId];
      if (!roundHoles) return;

      const index = roundHoles.findIndex(h => h.id === updated.id);
      if (index !== -1) {
        roundHoles[index] = {
          ...roundHoles[index],
          strokes: updated.strokes,
          score: updated.score
        };
      }
    });
  }

  private syncOriginalState(): void {
    for (const roundId in this.holes) {
      this.originalHoles[roundId] = structuredClone(this.holes[roundId]);
    }
  }

  public setEditable(): void {
    this.isEditable = !this.isEditable;

    if (!this.isEditable) {
      for (const roundId in this.originalHoles) {
        this.holes[roundId] = structuredClone(this.originalHoles[roundId]);
      }
    }

    this.buttonText = this.isEditable ? 'Otkaži izmene' : 'Izmeni';
  }
}
