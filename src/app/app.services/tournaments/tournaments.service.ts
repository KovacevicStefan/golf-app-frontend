import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Tournament } from '../../app.models/tournament.model';
import { TournamentPlayer } from '../../app.models/tournament.player.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private readonly API_URL = 'http://localhost:8080/api/tournaments';
  private readonly API_PLAYERS = 'http://localhost:8080/api/players';
  private readonly API_HOLES = `http://localhost:8080/api/holes`;
  private readonly API_ROUNDS = `http://localhost:8080/api/rounds`;

  constructor(private httpClient: HttpClient) {}

  public getAllTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>(this.API_URL).pipe(
      catchError((error: HttpErrorResponse) => {
        //console.log(error.name + ' ' + error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getTournamentById(id: number): Observable<Tournament> {
    return this.httpClient.get<Tournament>(`${this.API_URL}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getPlayersByTournamentId(id: number): Observable<TournamentPlayer[]> {
    return this.httpClient.get<TournamentPlayer[]>(`${this.API_PLAYERS}/tournament/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getTournamentsByPlayerUsername(username: string): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_PLAYERS}/tournaments/username/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getResultsByRounds(resultId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_HOLES}/rounds/${resultId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getRoundsByResultId(resultId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_ROUNDS}/result/${resultId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getHolesByRoundId(roundId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.API_HOLES}/round/${roundId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
