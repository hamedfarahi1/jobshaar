import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserRoleService } from '../service/user-role.service';
import { AccountService } from './account.service';

const employerAccess: string[] = [
  '/job/add',
]

const employeeAccess: string[] = [
]

@Injectable({ providedIn: 'root' })
export class UserRoleRouteAccess implements CanActivate {
  constructor(
    private router: Router,
    private userRoleService: UserRoleService,
    private accountService: AccountService
  ) { }

  isEmployer = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    let ret = false;
    let role = this.userRoleService.userRole;
    if (role !== 'employee' && role !== 'employer')
      return this.accountService.get().pipe(
        map(res => {
          if (res.body && res.body.role)
            role = res.body.role.toLowerCase();
          this.isEmployer = role === 'employer';
          if (this.isEmployer)
            ret = employerAccess.includes(state.url) ? true : false;
          else ret = employeeAccess.includes(state.url) ? true : false;
          if (ret) return true;
          else {
            console.log(role);
            this.router.navigate(['']);
            return false;
          }
        },
          catchError((err) => {
            return of(false);
          }))
      )
    else {
      this.isEmployer = role === 'employer';
      if (this.isEmployer)
        ret = employerAccess.includes(state.url) ? true : false;
      else ret = employeeAccess.includes(state.url) ? true : false;
      if (ret) return of(true);
      else {
        this.router.navigate(['']);
        return of(false);
      }
    }
  }
}
