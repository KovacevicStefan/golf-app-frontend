import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  authUser?: any;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadAuthenticatedUser();
  }

  public loadAuthenticatedUser() {
    this.userService.getProfileData().subscribe(data => {
      this.authUser = data;
      localStorage.setItem("authUser", JSON.stringify(data));
    });
  }

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
      window.location.href = "/";
  }

}
