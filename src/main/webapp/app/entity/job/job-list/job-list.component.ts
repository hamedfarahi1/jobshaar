import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/core/auth/account.service';
import { IJob } from '@app/core/model/job/job.model';
import { JobService } from '@app/core/service/job/job-service';
import { UserRoleService } from '@app/core/service/user-role.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {

  isEmployer: boolean = false;
  jobs: IJob[] = [];
  constructor(
    private jobService: JobService,
    private userRoleService: UserRoleService,
    private accountService: AccountService
  ) {
  }

  ngOnInit(): void {
    let role = this.userRoleService.userRole;
    if (role !== 'employee' && role !== 'employer')
      this.accountService.get().subscribe(res => {
        let user = res.body;
        if (user && user.role) {
          role = user.role.toLowerCase();
          this.isEmployer = role === 'employer';
          if (this.isEmployer)
            this.jobService.getEmployerJobs().subscribe(res => this.jobs = res, error => console.log(error));
          else
            this.jobService.getEmployeeJobs().subscribe(res => this.jobs = res, error => console.log(error));
        }
      })
    else {
      this.isEmployer = role === 'employer';
      if (this.isEmployer)
        this.jobService.getEmployerJobs().subscribe(res => this.jobs = res, error => console.log(error));
      else
        this.jobService.getEmployeeJobs().subscribe(res => this.jobs = res, error => console.log(error));
    }
  }

  getColor(): string {
    return '#' + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);
  }
}