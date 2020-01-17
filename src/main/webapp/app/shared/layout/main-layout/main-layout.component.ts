import { Component } from '@angular/core';
import { UserRoleService } from '@app/core/service/user-role.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  opened: boolean = false;

  isEmployer: boolean = false;
  constructor(
    private userRoleService: UserRoleService,
  ) { }
  ngOnInit() {
    this.userRoleService.isEmployerObv().subscribe(
      res => this.isEmployer = res
    )
  }
}
