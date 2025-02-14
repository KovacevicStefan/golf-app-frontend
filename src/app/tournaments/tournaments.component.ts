import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { Tournament } from '../app.models/tournament.model';


@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss'
})
export class TournamentsComponent {

  dataSource?: Tournament[];
  tournamentLength?: number;

  constructor(private service: TournamentsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  tournamentCount(): boolean {
    return this.tournamentLength! > 0 ? true : false;
  }

  public loadData() {
    this.service.getAllTournaments().subscribe(data => {
      this.dataSource = data;
      this.tournamentLength = this.dataSource.length;
    });
  }

  details(id: number): void {
    window.location.href = `/turniri/${id}`;
  }
}
