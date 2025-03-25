import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent, RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  authenticated = localStorage.getItem("token");
  authUser = localStorage.getItem("authUser");

  constructor() { }

  ngOnInit() { }

}
