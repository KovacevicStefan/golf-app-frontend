import { Component } from '@angular/core';
import { ContactComponent } from '../contact/contact.component';
import { HeaderComponent } from '../header/header.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  sharedService: SharedService;

  constructor(sharedService: SharedService) {
    this.sharedService = sharedService;
  }

  ngOnInit() {
    this.sharedService.style = "";
  }

}
