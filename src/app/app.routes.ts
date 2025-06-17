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
import { authGuard } from './app.services/guards/auth.guard';
import { loginGuard } from './app.services/guards/login.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'tournaments', component: TournamentsComponent },
    { path: 'tournament/:id', component: TournamentDetailsComponent},
    { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
    { path: 'profile/:username', component: ProfileComponent, canActivate: [authGuard]},
    { path: 'result/:id', component: ResultDetailsComponent, canActivate: [authGuard]},
    { path: 'register', component: RegisterComponent, canActivate: [loginGuard]},
    { path: 'account', component: AccountComponent, canActivate: [authGuard]},
    { path: 'tournament-create', component: TournamentFormComponent, canActivate: [authGuard]}
];
