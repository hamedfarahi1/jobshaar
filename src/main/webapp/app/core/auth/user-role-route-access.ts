import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserRoleService } from '../service/user-role.service';

const employerAccess: string[] = [
  '/job/add',
]

const employeeAccess: string[] = [
]

@Injectable({ providedIn: 'root' })
export class UserRoleRouteAccess implements CanActivate {
  constructor(
    private router: Router,
    private userRoleService: UserRoleService
  ) { }

  isEmployer = false;
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {

    let ret = false;
    return this.userRoleService.isEmployerObv().pipe(
      map(
        res => {
          if (res)
            ret = employerAccess.includes(state.url) ? true : false;
          else ret = employeeAccess.includes(state.url) ? true : false;
          if (ret) return true;
          else {
            this.router.navigate(['']);
            return false;
          }
        }
      )
    )
  }
}
