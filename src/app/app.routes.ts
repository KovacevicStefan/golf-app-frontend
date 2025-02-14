import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { LoginComponent } from './login/login.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'turniri', component: TournamentsComponent },
    { path: 'turniri/:id', component: TournamentDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile/:username', component: ProfileComponent}
];
