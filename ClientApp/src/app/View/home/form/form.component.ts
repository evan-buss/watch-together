import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  @Input() create: Boolean = false;

  loginForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      serverAddress: new FormControl('', [Validators.required, this.serverAddressValidator()])
    });
  }

  get username() {
    return this.loginForm.get('username');
  }
  get serverAddress() {
    return this.loginForm.get('serverAddress');
  }

  onSubmit(): void {
    console.log(this.loginForm.value);
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
