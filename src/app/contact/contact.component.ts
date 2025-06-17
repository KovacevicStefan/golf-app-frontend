import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, Form } from '@angular/forms';
import { EmailService } from '../app.services/email/email.service';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {

  email: string = 'info@my-domain.com';
  fb: FormBuilder = inject(FormBuilder);

  constructor(private service: EmailService, private snackbar: SnackbarService) {}

  contactForm = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: [''],
    message: ['']
  });

  sendMessage() {
    if (this.contactForm.valid) {
      this.service.sendEmail(this.contactForm.value);
      this.snackbar.showSnackbar('Email je uspešno poslat! Uskoro očekujte odgovor.');
      this.contactForm.reset();
    } else {
      this.snackbar.showSnackbar('Niste uneli sve obavezne podatke ili podaci nisu u ispravnom formatu!');
      this.contactForm.markAllAsTouched();
    }
  }
}
