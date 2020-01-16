import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
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
  ): boolean {
    let ret = false;
    let role = this.userRoleService.userRole;
    if (role !== 'employee' && role !== 'employer')
      this.accountService.get().subscribe(res => {
        let user = res.body;
        if (user && user.role) {
          role = user.role.toLowerCase();
          this.isEmployer = role === 'employer';
        }
      })
    else
      this.isEmployer = role === 'employer';
    if (this.isEmployer)
      ret = employerAccess.includes(state.url) ? true : false;
    else ret = employeeAccess.includes(state.url) ? true : false;
    if (ret) return true;
    else {
      this.router.navigate(['']);
      return false;
    }
  }
}
