import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/user.service';
import { SnackbarService } from '../snackbar/snackbar.service';

export const authGuard: CanActivateFn = (route, state) => {

  const service = inject(UserService);
  const router = inject(Router);
  const snackbar = inject(SnackbarService);

  if (service.isLoggedIn()) {
    return true;
  } else {
    router.navigate(['/login']);
    snackbar.showSnackbar("Morate biti ulogovani da biste pristupili ovoj stranici!");
    return false;
  }
};
