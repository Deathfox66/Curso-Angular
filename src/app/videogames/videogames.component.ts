import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VideogamesService } from '../api/videogames.service';
import { Videogames } from '../model/data.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: ['./videogames.component.scss']
})
export class VideogamesComponent implements OnInit {

  formVideogames: FormGroup | undefined;
  id?:  number;
  title =  'Create a new element';

  constructor(private fb: FormBuilder, 
              private videogameSvc: VideogamesService, 
              private feedbackscvL: FeedbackService,
              private router: Router,
              private activatedRouter: ActivatedRoute,) { 



    this.formVideogames = this.fb.group({
      name: ['', Validators.required],
      plattform: ['', Validators.required],
      release: ['', Validators.required],
      mode: ['', Validators.required],
    });

    this.activatedRouter.params.subscribe({
      next: (p) => {
        if(p['id']){
            this.title = 'Editar Elemento';
            this.id = p['id'];
            this.getdata();
        }
      }
    })
  }

  ngOnInit(): void {}

  getdata(){
    this.feedbackscvL.loading.next(true);
    this.videogameSvc.getVideogame(this.id!).subscribe({
      next: (item) => {
        this.feedbackscvL.loading.next(false);
        this.formVideogames?.patchValue(item);
      },
      error: ()=> {
        this.feedbackscvL.loading.next(false);
        this.feedbackscvL.showMessage('Ooooooooops! Something went wrong');
      }
    });
  }

  save(){
      const dataform = this.formVideogames?.value as Videogames;
      this.videogameSvc.saveVideogames(dataform).subscribe({
        next: () => {
          this.feedbackscvL.loading.next(false);
          this.router.navigate(['home']);
        },
        error:() => {
           this.feedbackscvL.loading.next(false);
           this.feedbackscvL.showMessage('Ooooooooops! Something went wrong')
        }
      });
  }
  returnPage(){
    this.router.navigate(['home']);
  }

}
