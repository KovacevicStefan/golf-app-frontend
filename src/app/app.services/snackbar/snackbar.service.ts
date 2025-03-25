import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();

  showSnackbar(message: string) {
    this.messageSubject.next(message);
    setTimeout(() => this.hideSnackbar(), 3000);
  }

  hideSnackbar() {
    this.messageSubject.next(null);
  }
}
