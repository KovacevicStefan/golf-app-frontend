import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  const authReq = token ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`)}) : req.clone();

  return next(authReq);
};
