import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VideogamesService } from '../api/videogames.service';
import { Videogames } from '../model/data.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataVideogames = new MatTableDataSource<Videogames>();
  displayedColumns = ['id','name','plattform','release','mode','actions'];

  constructor(
    private videogames: VideogamesService, 
    private feedbacksvc: FeedbackService,
    private route: Router) { 
    this.feedbacksvc.loading.next(true);
    this.loadData();
  }
  loadData(){
    this.videogames.getVideogames().subscribe({
      next: (data) => {
        this.dataVideogames.data = data;
        this.feedbacksvc.loading.next(false);
      },
      error: () => {
          this.feedbacksvc.loading.next(false);
          this.feedbacksvc.showMessage('Ooooops!, Something went wrong');
      }
    });
  }

  deleteItem(item: Videogames){
    if(item.id){
    this.feedbacksvc.loading.next(true);
    this.videogames.deleteVideogames(item.id).subscribe({
      next: () => {
        this.feedbacksvc.loading.next(false);
        this.loadData();
      },
      error: () => {
        this.feedbacksvc.loading.next(false);
        this.feedbacksvc.showMessage('Ooooops!, Something went wrong');
      }
    });
    }
  }



  ngOnInit(): void {}

  algo(){
    this.route.navigate(['home2'])
  }

}
