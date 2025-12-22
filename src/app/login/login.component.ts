import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: any = {};

  constructor(private service: UserService, private snackbarService: SnackbarService, private router: Router) {}

  public login() {

    this.service.login(this.user).subscribe(data => {

      const expirationTime = Date.now() + data.expiresIn;
      localStorage.setItem("token", data.token);
      localStorage.setItem('expiration', expirationTime.toString());
      this.service.scheduleAutoLogout(data.expiresIn);

      this.service.getProfileData().subscribe(user => {
        this.service.setAuthenticatedUser(user);
        this.router.navigate(['/account']);
        this.snackbarService.showSnackbar("Uspesno ste se prijavili!");
      });
    }, error => {
      this.snackbarService.showSnackbar(error.error.error_description);
  });
  }
}
