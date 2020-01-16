import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRoleRouteAccess } from '@app/core/auth/user-role-route-access';
import { UserRouteAccessService } from '@app/core/auth/user-route-access-service';
import { JobCrudComponent } from './job-crud/job-crud.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobComponent } from './job.component';


const routes: Routes = [
  {
    path: 'job',
    component: JobComponent,
    canActivate: [UserRouteAccessService],
    children: [
      {
        path: 'add',
        component: JobCrudComponent,
        canActivate: [UserRoleRouteAccess]
      },
      {
        path: 'list',
        component: JobListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
