import { Component } from '@angular/core';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-tournament-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './tournament-form.component.html',
  styleUrl: './tournament-form.component.scss'
})
export class TournamentFormComponent {

  tournament: any = {
    name: '',
    location: '',
    description: '',
    roundNumber: '',
    holeNumber: '',
    status: true,
    startDate: '01-01-2000',
    endDate: '01-01-2000',
    pars: [] as { holeNumber: number, par: number }[]
  };

  constructor(private tournamentService: TournamentsService, private router: Router, private snackbar: SnackbarService) {}

  public createTournament(tournament: any) {
    this.tournamentService.createTournament(tournament).subscribe(() => {
      this.router.navigate(['/tournaments']);
      this.snackbar.showSnackbar(`Uspesno ste kreirali turnir ${tournament.name}!`);
    });
  }

  getHoles(): number[] {
    return Array.from({ length: Number(this.tournament.holeNumber) || 0 }, (_, i) => i + 1);
  }

  updatePars() {
    this.tournament.pars = this.getHoles().map(hole => ({
      holeNumber: hole,
      par: null
    }));
    this.tournament.pars.sort((a: { holeNumber: number; }, b: { holeNumber: number; }) => a.holeNumber - b.holeNumber);
  }
}

