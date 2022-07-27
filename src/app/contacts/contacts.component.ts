import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService } from '../api/contacts.service';
import { Contacts } from '../model/data2.model';
import { FeedbackService } from '../services/feedback.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  id?: number;

  formContacts:  FormGroup | undefined;

  constructor( private fb: FormBuilder, 
               private conatcSvc: ContactsService,
               private feedback: FeedbackService,
               private router: Router,
               private activated: ActivatedRoute,) 
               { 
    this.formContacts = this.fb.group({
      name: ['',Validators.required],
      last_name: ['', Validators.required],
      phone_number: ['',Validators.required],
      avatar: [''],
    });

    this.activated.params.subscribe({
      next: (p) => {
        if(p['id']){
          this.id = p['id'];
          this.getData();
        }
      }
    })
  }

  ngOnInit(): void {}

  getData(){
    this.feedback.loading.next(true);
    this.conatcSvc.getContact(this.id!).subscribe({
      next: (item) => {
        this.feedback.loading.next(false);
        this.formContacts?.patchValue(item);
      }
    })
  }

  save(){
    const dataform = this.formContacts?.value as Contacts;

    this.feedback.loading.next(true);
    this.conatcSvc.saveContacts(dataform, this.id).subscribe({
      next: () => {
        this.feedback.loading.next(false);
        this.router.navigate(['home2']);
      },
      error: ()=> {
        this.feedback.loading.next(false);
        this.feedback.showMessage("Ooooooooooops something went wrong");
      }
    })
  }

  returnPage(){
    this.router.navigate(['home2']);
  }

}
