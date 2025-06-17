import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentsService } from '../app.services/tournaments/tournaments.service';
import { Tournament } from '../app.models/tournament.model';
import { UserService } from '../app.services/user/user.service';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-tournaments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tournaments.component.html',
  styleUrl: './tournaments.component.scss'
})
export class TournamentsComponent {

  data$!: Observable<Tournament[]>;

  constructor(private service: TournamentsService) {}

  ngOnInit(): void {
    this.data$ = this.service.getAllTournaments();
  }

}
