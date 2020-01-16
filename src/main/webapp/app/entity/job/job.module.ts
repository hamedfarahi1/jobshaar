import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { SharedLibModule } from '@app/shared/shared-lib/shared-lib.module';
import { SharedModule } from '@app/shared/shared.module';
import { JobCrudComponent } from './job-crud/job-crud.component';
import { JobRoutingModule } from './job-routing.module';
import { JobComponent } from './job.component';

@NgModule({
  declarations: [
    JobComponent,
    JobCrudComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    SharedLibModule,
    SharedModule,
  ],
  exports: [],
  providers: [
    JobKeyValue
  ],
})
export class JobModule { }
