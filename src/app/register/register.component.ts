import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { FormsModule } from '@angular/forms';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerUser: any = {
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    image: "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg"
  };

  repeatPassword = ``;
  
  constructor(private service: UserService, private snackbar: SnackbarService, private router: Router) {}


  public validatePassword(): boolean {
    return this.repeatPassword == this.registerUser.password ? true : false;
  }


  public addPlayer() {
      if(this.validatePassword()) {
        this.service.createPlayer(this.registerUser).subscribe({
        next: () => {
          this.router.navigate(['/']);
          this.snackbar.showSnackbar(`Uspesno je kreiran nalog ${this.registerUser.username}`);
        },
        error: (error) => {
          this.snackbar.showSnackbar(`${error.error.error_description}`);
        }
      });
    }
  }
}
