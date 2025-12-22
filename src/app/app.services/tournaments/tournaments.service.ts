import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { Tournament } from '../../app.models/tournament.model';
import { TournamentPlayer } from '../../app.models/tournament.player.model';
import { Hole } from '../../app.models/hole.model';
import { Result } from '../../app.models/result.model';
import { Round } from '../../app.models/round.model';

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
        console.error(`Error while fetching tournaments: ${error.message}`);
        return of([]);
      })
    );
  }

  public getTournamentById(id: number): Observable<Tournament> {
    return this.httpClient.get<Tournament>(`${this.API_URL}/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return of ();
      })
    );
  }

  public getPlayersByTournamentId(id: number): Observable<TournamentPlayer[]> {
    return this.httpClient.get<TournamentPlayer[]>(`${this.API_PLAYERS}/tournament/${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return of ();
      })
    );
  }

  public getTournamentsByPlayerUsername(username: string): Observable<TournamentPlayer[]> {
    return this.httpClient.get<TournamentPlayer[]>(`${this.API_PLAYERS}/tournaments/username/${username}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getResultsByRounds(resultId: number): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.API_HOLES}/rounds/${resultId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getRoundsByResultId(resultId: number): Observable<Round[]> {
    return this.httpClient.get<Round[]>(`${this.API_ROUNDS}/result/${resultId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getHolesByRoundId(roundId: number): Observable<Hole[]> {
    return this.httpClient.get<Hole[]>(`${this.API_HOLES}/round/${roundId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public getTournamentPlayerByResultId(resultId: number): Observable<TournamentPlayer> {
    return this.httpClient.get<TournamentPlayer>(`${this.API_PLAYERS}/result/${resultId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.message));
      })
    );
  }

  public registerPlayerToTournament(request: any): Observable<any> {
    return this.httpClient.post<any>(`http://localhost:8080/api/players`, request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error.message);
        return of ([]);
      })
    );
  }

  public createTournament(tournament: any): Observable<any> {
    return this.httpClient.post<any>(`${this.API_URL}`, tournament).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error("Cannot create tournament.");
        return of ([]);
      })
    )
  }

  public getResultsByTournament(id: number): Observable<Result[]> {
    return this.httpClient.get<Result[]>(`${this.API_URL}/table/${id}`).pipe(
      map((data: any[]) => data.sort((a, b) => {
      if (a.totalPar === "/") return 1;
      if (b.totalPar === "/") return -1;
      return a.totalPar - b.totalPar;
    }))
    );
  }

  public updateHoles(holeDTO: any[]): Observable<any[]> {
    return this.httpClient.put<any[]>(`${this.API_HOLES}`, holeDTO);
  }
  

}
