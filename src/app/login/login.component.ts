import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: any = {};

  constructor(private service: UserService, private snackbarService: SnackbarService) {}

  public login() {
    this.service.login(this.user).subscribe(data => {
      localStorage.setItem("token", data.token);
      window.location.href = "/account";
    },() => {
      this.snackbarService.showSnackbar("Pogresno korisnicko ime ili lozinka. Pokusajte ponovo.");
  });
  }

}
