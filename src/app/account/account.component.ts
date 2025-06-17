import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { Router } from '@angular/router';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';
import { User } from '../app.models/user.model';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {

  authUser$!: Observable<User | null>;

  constructor(private userService: UserService, private router: Router, private snackbar: SnackbarService) {}

  ngOnInit() {
    this.authUser$ = this.userService.getProfileData();
  }

  public logout() {
    this.userService.logout().subscribe();
    this.router.navigate(['/']);
    this.snackbar.showSnackbar("Uspesno ste se odjavili!");
  }

}
