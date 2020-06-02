import { User } from './../models/user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private isLogin: boolean = false;
public user: User = {
  name: '',
  password: '',
  token: ''
};
public currentUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLogin);

constructor(private router: Router) { }

public getLoginChange(): Observable<boolean>  {
  return this.currentUser.asObservable();
}

public getCurrentLogin(): boolean {
  return this.currentUser.getValue();
}

public setAuthState(state: boolean): void {
  this.currentUser.next(state);
}

public loginUser(): void {
  this.user.token = `${this.user.name}${this.user.password}`;
  this.isLogin = true;
  this.setAuthState(this.isLogin);
  this.router.navigateByUrl('/home');
  localStorage.setItem('isLogin', this.user.token);
}

public unLoginUser(): void {
  this.isLogin = false;
  this.setAuthState(this.isLogin);
  this.router.navigateByUrl('/login');
  localStorage.removeItem('token');
}

}
