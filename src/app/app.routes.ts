import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TournamentsComponent } from './tournaments/tournaments.component';
import { LoginComponent } from './login/login.component';
import { TournamentDetailsComponent } from './tournament-details/tournament-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultDetailsComponent } from './result-details/result-details.component';
import { RegisterComponent } from './register/register.component';
import { AccountComponent } from './account/account.component';
import { TournamentFormComponent } from './tournament-form/tournament-form.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tournaments', component: TournamentsComponent },
    { path: 'tournament/:id', component: TournamentDetailsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'profile/:username', component: ProfileComponent},
    { path: 'result/:id', component: ResultDetailsComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'account', component: AccountComponent},
    { path: 'tournament-create', component: TournamentFormComponent }
];
