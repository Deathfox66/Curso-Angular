import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalService {

    userAuthenticated = new Subject<boolean>();

  constructor() { }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }
  
  hasValidToken(): boolean{
    return Boolean( localStorage.getItem('token'));
  }

  removeToken(){
    localStorage.removeItem('token');
  }
}
