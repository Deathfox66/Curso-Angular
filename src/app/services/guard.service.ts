import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(
    private localSvc: LocalService,
    private router: Router,
    ) { }
  canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): 
      boolean |
       UrlTree | 
       Observable<boolean |
       UrlTree> |
       Promise<boolean |
       UrlTree> {
      //Logica de validacion de acceso a la ruta
      const validToken = this.localSvc.hasValidToken();
      if(!validToken){
          this.router.navigate(['login']);
      }
      return this.localSvc.hasValidToken();
  }
}
