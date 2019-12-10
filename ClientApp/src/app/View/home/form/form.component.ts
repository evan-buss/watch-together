import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  @Input() create: boolean = true;

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.loginForm.valid) { return; }
    if (this.create) {
      let success = this.userService.setHost(this.username.value, this.password.value);
      if (success) { console.log("redirecting?"); this.router.navigate(['/movie']); }
    } else {
      this.userService.setViewer(this.username.value);
      this.router.navigate(['/movie'])
    }
    // Redirect and send success notification
  }

  /**
   * Ensure server address is in 192.168.1.1:8080 format
   */
  serverAddressValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      var regex = new RegExp(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):\d{4,5}$/)
      const valid = regex.test(control.value);

      return !valid ? { 'invalidAddress': { value: control.value } } : null;
    };
  }
}
