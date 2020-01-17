import { KeyValue } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyKeyValue } from '@app/shared/shared-common/key-value/company-key-value';
import { AuthServerProvider } from '../../../core/auth/auth-jwt.service';
import { CompanyService } from '../../../core/service/company/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authenticationError: boolean = false;
  errorType: string = '';
  step: number = 1;
  isEmployer: boolean = false;
  selectedCategory: number = 0;
  companyKeyValue: KeyValue<number, string>[] = [];
  credentials = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5),
      ]),
    email: new FormControl('',
      [
        Validators.required,
        Validators.email
      ])
  })

  employerDetail = new FormGroup({
    name: new FormControl('',
      [
        Validators.minLength(8),
        Validators.required
      ]),
    categoryTypeIndex: new FormControl('',
      [
        Validators.required
      ]),
    bio: new FormControl('',
      []),
    address: new FormControl('',
      [
        Validators.required,
      ])
  })
  constructor(
    private accountService: AuthServerProvider, private router: Router,
    private route: ActivatedRoute,
    private companyKeyValues: CompanyKeyValue,
    private companyService: CompanyService,
    private elementRef: ElementRef,
    private renderer: Renderer, ) {
  }

  ngOnInit() {
    this.companyKeyValues.getAll().subscribe(res => this.companyKeyValue = res);
    this.route.queryParams.subscribe(param => {
      (param.step == 1 || param.step == 2 ? this.step = param.step : this.step = 1);
      let focusOn = this.step === 1 ? '#username' : '#name'
      setTimeout(() =>
        this.renderer.invokeElementMethod(
          this.elementRef.nativeElement.querySelector(focusOn),
          'focus',
          []
        ))
    })
  }

  submit(type: number) {
    this.isEmployer = type == 0;
    this.accountService.register(this.credentials.value, this.isEmployer).subscribe(() => {
      if (this.isEmployer)
        this.router.navigate(['account', 'register'], { queryParams: { step: 2 } })
      else {
        this.isEmployer ?
          this.router.navigate(['job']) :
          this.router.navigate(['home'])
      }

    });
  }
  submitEmpolyer() {
    this.companyService.add(this.employerDetail.value).subscribe(() => {
      this.router.navigate(['job']);
    }, error => {
      console.log(error);
    });
  }
}
