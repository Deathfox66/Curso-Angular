import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FeedbackService } from './services/feedback.service';
import { LocalService } from './services/local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'capangular';
  isLoading = false;
  isLogged = false;

  constructor(private feedbackSvc: FeedbackService, 
              private lcoalSvc: LocalService, 
              private route: Router){


    this.feedbackSvc.loading.subscribe({

      next: (isLoading) => {
       this.isLoading = isLoading;

      }
    });

    this.isLoading = this.lcoalSvc.hasValidToken();
    this.lcoalSvc.userAuthenticated.subscribe({
        next: (userAuth) => {
          this.isLogged = userAuth;
        }
    });

  }
  logout(){
    this.isLogged = false;
    this.lcoalSvc.removeToken();
    this.route.navigate(['login']);
  }

}
