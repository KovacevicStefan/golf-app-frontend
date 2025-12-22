import { Component } from '@angular/core';
import { UserService } from '../app.services/user/user.service';
import { Observable } from 'rxjs';
import { User } from '../app.models/user.model';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '../app.services/snackbar/snackbar.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activate-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './activate-profile.component.html',
  styleUrl: './activate-profile.component.scss'
})
export class ActivateProfileComponent {

  authUser$!: Observable<User | null>;
  token : string | null = null;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, private snackbar: SnackbarService) {}

  ngOnInit() {
      this.token = this.route.snapshot.queryParamMap.get('token');

      if (!this.token) {
        this.snackbar.showSnackbar('Invalid activation link');
        this.router.navigate(['/']);
        return;
      } else {
          this.authenticateUser(this.token!);
      }
  }

  public authenticateUser(token: string) {
    const request = {
      token: token
    };
    
    this.userService.activateProfile(request).subscribe({
      next: (data) => {
        this.snackbar.showSnackbar(`${data.message}`);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.snackbar.showSnackbar(`${error.error.error_description}`);
        this.router.navigate(['/']);
      }
    });
  }

}
