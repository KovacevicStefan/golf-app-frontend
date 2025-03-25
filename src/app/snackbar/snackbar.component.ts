import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  constructor(private snackbarService: SnackbarService) {}

  get message$() {
    return this.snackbarService.message$;
  }

  hideSnackbar() {
    this.snackbarService.hideSnackbar();
  }
}
