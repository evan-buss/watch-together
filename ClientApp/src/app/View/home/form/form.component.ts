import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/Service/user.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/Component/notifications/notification.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: []
})
export class FormComponent implements OnInit {

  @Input() create: boolean = false;

  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private notifService: NotificationService) { }

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

  onSubmit(event: any): void {
    event.preventDefault();
    if (!this.loginForm.valid) { return; }
    // TODO: Ping server address to make sure IP address is valid
    if (this.create) {
      this.userService.setHost(this.username.value, this.serverAddress.value);
    } else {
      this.userService.setViewer(this.username.value, this.serverAddress.value);
    }

    // Redirect and send success notification
    this.router.navigate(['/movie'])
    this.notifService.addTemporary({ title: "Login Successful", message: "You have sucessfully connected" });
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
