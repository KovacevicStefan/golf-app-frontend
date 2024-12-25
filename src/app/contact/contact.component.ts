import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Email } from '../models/email/email.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  email: string = "info@my-domain.com";
  message: Email = new Email();

  sendMessage() {
    console.log(this.message);
  }

}
