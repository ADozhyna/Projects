import { LoginService } from './../../../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit {
  private isLogin: boolean;
  public imgPath: string = 'assets/Subtract.svg';
  public imgWidth: number = 24;

  constructor(private loginService: LoginService) { }

  public logout(): void {
    this.loginService.unLoginUser();
  }

  public ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    }
    this.loginService.getLoginChange().subscribe((currentUser => {
      this.isLogin = currentUser;
    }));
  }

}
