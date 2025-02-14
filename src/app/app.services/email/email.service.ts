import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from '../../app.models/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly API_URL = 'http://localhost:8080/api/email';

  constructor(private httpClient: HttpClient) { }

  public sendEmail(email: Email): void {
    this.httpClient.post(this.API_URL, email).subscribe();
  }

}
