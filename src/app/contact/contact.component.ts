import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Email } from '../app.models/email.model';
import { EmailService } from '../app.services/email/email.service';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [Email]
})
export class ContactComponent {

  email: string = "info@my-domain.com";

  constructor(private service: EmailService, public message: Email, private snackbarService: SnackbarService) {
  }

  sendMessage() {
    if (this.message.name && this.message.lastName && this.message.email) {
      this.service.sendEmail(this.message);
      this.snackbarService.showSnackbar("Email je uspešno poslat! Uskoro očekujte odgovor.");
      this.message.reset();
    } else {
      this.snackbarService.showSnackbar("Niste uneli sve obavezne podatke!");
    }
  }

}
