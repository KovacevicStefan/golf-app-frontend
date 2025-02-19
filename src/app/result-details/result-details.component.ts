import { Component } from '@angular/core';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result-details.component.html',
  styleUrl: './result-details.component.scss',
})
export class ResultDetailsComponent {

  rounds?: any[];
  holes: { [roundId: number]: any } = {};
  holeNum: { [roundId: number]: any } = {};
  player?: any;

  scoreCategories = [
    { name: "Double-Eagle", color: "DOUBLE_EAGLE" },
    { name: "Eagle", color: "EAGLE" },
    { name: "Birdie", color: "BIRDIE" },
    { name: "Par", color: "PAR" },
    { name: "Bogey", color: "BOGEY" },
    { name: "Double-Bogey", color: "DOUBLE_BOGEY" },
    { name: "3+ Bogey", color: "THREE_PLUS_BOGEY" }
  ];

  constructor(public service: TournamentsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.loadResult(id);
      this.loadTournamentPlayer(id);
    });
  }

  public loadResult(resultId: number): void {
    this.service.getRoundsByResultId(resultId).subscribe(data => {
      this.rounds = data;
      this.rounds.forEach(round => {
        this.loadHolesForRound(round.id);
      })
    });
  }

  public loadHolesForRound(roundId: number): void {
    this.service.getHolesByRoundId(roundId).subscribe(data => {
      this.holes[roundId] = data.sort((a, b) => a.id - b.id);
    });
  }

  public loadTournamentPlayer(resultId: number): void {
    this.service.getTournamentPlayerByResultId(resultId).subscribe(data => {
      this.player = data;
    })
  }

}
