import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {

  isEmptyRequired: boolean = true;
  snackMessage?: string;

  constructor() {
  }

  showSnackBar(message: string) : void {
    this.isEmptyRequired = false;
    this.snackMessage = message;
    setTimeout(() => this.hideSnackBar() , 3000);
  }
  
  hideSnackBar() : void {
    this.isEmptyRequired = true;
  }


}
