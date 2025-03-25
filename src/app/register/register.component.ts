import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { FormsModule } from '@angular/forms';

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

  message = ``;

  constructor(private service: UserService) {}


  public validatePassword(): boolean {
    return this.repeatPassword == this.registerUser.password ? true : false;
  }


  public addPlayer() {
    if(this.validatePassword()) {
      this.service.createPlayer(this.registerUser).subscribe();
    this.message = `Uspesno je kreiran nalog ${this.registerUser.username}`;
    } else {
      this.message = `Lozinke se ne podudaraju. Pokusaj ponovo.`;
    }
 
  }

}
