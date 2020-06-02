import { LoginService } from './../services/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanLoad {
  constructor (private router: Router, private loginService: LoginService) {}

  get currentUser(): BehaviorSubject<boolean> {
    return this.loginService.currentUser;
  }
  public canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      if (this.currentUser.value || localStorage.getItem('token')) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
    }

}
