import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthServerProvider } from './auth-jwt.service';


@Injectable({ providedIn: 'root' })
export class UserRouteAccessService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServerProvider
  ) { }

  canActivate(): boolean {
    return this.simpleCanActive();
  }

  simpleCanActive(): boolean {
    if (this.authService.getToken() !== null && this.authService.getToken() !== undefined)
      return true;
    this.router.navigate(['account', 'login']);
    return false;
  }
}
