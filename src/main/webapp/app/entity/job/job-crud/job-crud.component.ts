import { KeyValue } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '@app/core/service/job/job-service';
import { JobKeyValue } from '@app/shared/shared-common/key-value/job-key-value';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-job-crud',
  templateUrl: './job-crud.component.html',
  styleUrls: ['./job-crud.component.scss']
})
export class JobCrudComponent implements OnInit {


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '300px',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'شرح شغلی ...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [{
      name: 'IRANSans',
      class: 'IRANSans'
    }],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };

  selected: number[] = [0, 1, 2];
  categoryTypes: KeyValue<number, string>[] = [];
  cooperationTypes: KeyValue<number, string>[] = [];
  requiredGenders: KeyValue<number, string>[] = [];
  jobForm = new FormGroup({
    categoryType: new FormControl('', [
      Validators.required
    ]),
    cooperationType: new FormControl('', [
      Validators.required
    ]),
    requiredGender: new FormControl('', [
      Validators.required
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators
        .minLength(200)
    ])
  })
  constructor(
    jobKeyValues: JobKeyValue,
    private jobService: JobService,
    private router: Router
  ) {
    jobKeyValues.getCategoryTypes().subscribe(
      res => this.categoryTypes = res
    )
    jobKeyValues.getCooperationTypes().subscribe(
      res => this.cooperationTypes = res
    )
    jobKeyValues.getRequiredGenders().subscribe(
      res => this.requiredGenders = res
    )
  }

  ngOnInit(): void { }

  submit() {
    this.jobService.add(this.jobForm.value).subscribe(() => {
      this.router.navigate(['job', 'list']);
    }, error => console.log(error));
  }
}
