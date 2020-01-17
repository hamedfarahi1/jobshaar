import { AfterContentInit, Component, ElementRef, Renderer } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICredentials } from '@app/core/auth/credentials.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterContentInit {
  authenticationError: boolean = false;
  errorType: string = '';
  isEmployer: boolean = false;
  credentials = new FormGroup({
    username: new FormControl('',
      [
        Validators.required,
        Validators.minLength(6)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ])
  })
  constructor(
    private loginService: LoginService,
    private elementRef: ElementRef,
    private renderer: Renderer,
    private router: Router) {
  }

  ngAfterContentInit() {
    setTimeout(() =>
      this.renderer.invokeElementMethod(
        this.elementRef.nativeElement.querySelector('#username'),
        'focus',
        []
      ))
  }

  login(type: number): void {
    this.isEmployer = type == 0;
    const formPeropery: ICredentials = this.credentials.value;
    this.loginService
      .login(this.isEmployer, {
        username: formPeropery.username,
        password: formPeropery.password,
        rememberMe: formPeropery.rememberMe
      })
      .then(() => {
        this.authenticationError = false;
        this.isEmployer ?
          this.router.navigate(['/job']) :
          this.router.navigate(['/home']);
      })
      .catch((error) => {
        this.authenticationError = true;
        this.errorType = error.error.detail;
      });
  }
}
