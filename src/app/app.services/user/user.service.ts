import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { User } from '../../app.models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Result } from '../../app.models/result.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private API_URL = `http://localhost:8080/api/users/username`;
  private API_RESULTS = `http://localhost:8080/api/results`;

  constructor(private httpClient: HttpClient) { }

  public getUserByUsername(username: string): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/${username}`).pipe(
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

}
