import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ContactsService } from '../api/contacts.service';
import { Contacts } from '../model/data2.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.scss']
})
export class Home2Component implements OnInit {
  [x: string]: any;
  dataContacts = new MatTableDataSource<Contacts>();
  displayedColumns = ['id','name','last_name','phone_number','avatar','gender','actions','delete'];


  constructor(private contactSvc: ContactsService,
              private feedbacksvc: FeedbackService,
              private router: Router,) { 
    this.feedbacksvc.loading.next(true);
    this.loadData();
  }

  ngOnInit(): void {
  }

  loadData(){
    this.contactSvc.getContacts().subscribe({
      next: (data) => {
        this.feedbacksvc.loading.next(false);
        this.dataContacts.data = data;
      },
      error: () => {
        this.feedbacksvc.showMessage("Oooooooooooops!, something went wrong!");
      },
    });
  }

  deleteItem(item: Contacts){
    if (item.id){
      this.feedbacksvc.loading.next(true);
      this.contactSvc.deleteContacts(item.id).subscribe({
        next: () => {
          this.feedbacksvc.loading.next(false);
          this.loadData();
        },
        error: () => {
          this.feedbacksvc.loading.next(false);
          this.feedbacksvc.showMessage("Oooooooooooops!, something went wrong!");
        }
      });
    }
  }


  returnPage(){
    this.router.navigate(['home']);
  }
  conta(){
    this.router.navigate(['home2/contacts']);
  }

}
