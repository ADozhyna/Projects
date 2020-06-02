import { LoginService } from './../../../core/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(public loginservice: LoginService) { }

  public submit(): void {
    if (this.loginservice.user.name && this.loginservice.user.password) {
      this.loginservice.loginUser();
    }
  }

  public ngOnInit(): void {
  }

}
