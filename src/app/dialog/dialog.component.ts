import { Component } from '@angular/core';
import { DialogService } from '../app.services/dialog/dialog.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(private dialogService: DialogService, private snackbarService: SnackbarService) {}

  get tournament$() {
    return this.dialogService.tournament$;
  }

  get user$() {
    return this.dialogService.user$;
  }

  hideDialog() {
    this.dialogService.hideDialog();
    this.snackbarService.showSnackbar("Odustali ste.");
  }

  confirmDialog(user: any, tournament: any) {
    this.dialogService.registerPlayerToTournament(user.id, tournament.id);
  }

}
