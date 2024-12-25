import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Tournament } from '../../models/tournament/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {

  private readonly API_URL = 'http://localhost:8080/api/tournaments';

  dataChange: BehaviorSubject<Tournament[]> = new BehaviorSubject<Tournament[]>([]);

  constructor(private httpClient: HttpClient) {}


  public getAllTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>(this.API_URL).pipe(
      tap(data => {
        this.dataChange.next(data);
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error.name + ' ' + error.message);
        return throwError(error);
      })
    );
  }
}
