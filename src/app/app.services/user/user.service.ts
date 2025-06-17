import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../../app.models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Result } from '../../app.models/result.model';
import { Router } from '@angular/router';
import { SnackbarService } from '../snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private logoutTimer: any;
  private authUserSubject = new BehaviorSubject<User | null>(null);
  public authenticatedUser$ = this.authUserSubject.asObservable();
  private API_URL = `http://localhost:8080/api/users`;
  private API_RESULTS = `http://localhost:8080/api/results`;
  private API_AUTH = `http://localhost:8080/api/auth`;

  constructor(private httpClient: HttpClient, private router: Router, private snackbar: SnackbarService) { this.loadUserOnStartup(); }

  public loadUserOnStartup() {
    this.getProfileData().subscribe(user => {
      this.authUserSubject.next(user);
    });
  }

  public setAuthenticatedUser(user: User | null) {
    this.authUserSubject.next(user);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/username/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getResultsByPlayer(username: string): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.API_RESULTS}/player/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of([]);
        }
        return throwError(() => new Error(error.message));
      })
    );
  }

  public createPlayer(player: any): Observable<any> {
    return this.httpClient.post(`${this.API_AUTH}/signup`, player).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log(error.message));
      })
    );
  }

  public login(credentials: any): Observable<any> {
    return this.httpClient.post(`${this.API_AUTH}/login`, credentials).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log(error.message));
      })
    );
  }

  public logout(): Observable<any> {
    this.setAuthenticatedUser(null);
    localStorage.removeItem("token");
    clearTimeout(this.logoutTimer);
    return this.httpClient.get(`${this.API_AUTH}/logout`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => console.log(error.message));
      })
    );
  }

  public getProfileData(): Observable<User | null> {
    return this.httpClient.get<User>(`${this.API_URL}/me`).pipe(
      catchError(() => {
        return of(null);
      })
    )
  }

  public scheduleAutoLogout(expiresIn: number) {
    const timeout = expiresIn;

    if (timeout <= 0) {
      this.logout();
    } else {
      this.logoutTimer = setTimeout(() => {
        this.logout();
        this.router.navigate(['/']);
        this.snackbar.showSnackbar(`Vasa sesija je istekla. Prijavite se ponovo.`);
      }, timeout);
    }
  }

  public checkTokenOnAppStart() {
  const token = localStorage.getItem('token');
  const expiration = localStorage.getItem('expiration');

  if (!token || !expiration) return;

  const exp = +expiration;
  const now = Date.now();

  if (exp <= now) {
    this.logout();
  } else {
    const remainingTime = exp - now;
    this.scheduleAutoLogout(remainingTime);
  }
}

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');

    if (!token || !expiration) return false;

    const now = Date.now();
    const exp = +expiration;

    return exp > now;
  }

}