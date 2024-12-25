import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'turniri', component: TournamentsComponent },
];
