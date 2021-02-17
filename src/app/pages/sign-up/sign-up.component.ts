import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../login/login.component.css',
    './sign-up.component.css'
  ]
})
export class SignUpComponent implements OnInit {
  isDisplayingFormErrors = false;
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(5), Validators.required]),
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.isDisplayingFormErrors = true;
    this.authService.registerUser(this.signUpForm.value)
      .subscribe(response => console.log('response', response));
  }

  isValidForm(): string {
    return '';
  }

  get name(): any {
    return this.signUpForm.get('name');
  }

  get email(): any {
    return this.signUpForm.get('email');
  }

  get password(): any {
    return this.signUpForm.get('password');
  }

}
