import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material';
import { IJob } from '@app/core/model/job/job.model';
import { JobService } from '@app/core/service/job/job-service';
import { UserRoleService } from '@app/core/service/user-role.service';
import { getCustomPaginatorIntl } from '@app/shared/shared-common/paginator/custom-paginator';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
  providers: [{ provide: MatPaginatorIntl, useClass: getCustomPaginatorIntl }]
})
export class JobListComponent implements OnInit {

  totalCount: number = 100;
  public page = 0;
  jobs: IJob[] = [];
  constructor(
    private jobService: JobService,
    private userRoleService: UserRoleService,
  ) {
  }

  ngOnInit(): void {
    this.userRoleService.isEmployerObv().subscribe(res => {
      if (res)
        this.jobService.getEmployerJobs().subscribe(res => this.jobs = res, error => console.log(error));
      else
        this.jobService.getEmployeeJobs().subscribe(res => this.jobs = res, error => console.log(error));
    })
  }

  readPage(event: any) {
    this.page = event.pageIndex;
  }

  charAt_0(id: number) {
    return id % 5 + 1;
  }
}
