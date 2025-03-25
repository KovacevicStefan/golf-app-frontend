import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { Tournament } from '../app.models/tournament.model';
import { UserService } from '../app.services/user/user.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss'
})
export class TournamentsComponent {

  dataSource?: Tournament[];
  tournamentLength?: number;

  constructor(private service: TournamentsService, private userService: UserService) {}

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

}
