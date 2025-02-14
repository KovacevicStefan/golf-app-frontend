import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Email } from '../app.models/email.model';
import { EmailService } from '../app.services/email/email.service';
import { CommonModule } from '@angular/common';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule, SnackbarComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  providers: [Email]
})
export class ContactComponent {

  email: string = "info@my-domain.com";
  
  @ViewChild(SnackbarComponent) snackBar!: SnackbarComponent;

  constructor(private service: EmailService, public message: Email) {
  }

  sendMessage() {
    if (this.message.name && this.message.lastName && this.message.email) {
        this.service.sendEmail(this.message);
        this.snackBar.showSnackBar("Email je uspešno poslat! Uskoro očekujte odgovor.");  
        this.message.reset();
    } else {
        this.snackBar.showSnackBar("Niste uneli sve obavezne podatke!");
    }
}

}
