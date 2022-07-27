import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment2 } from 'src/environments/environment';
import { Contacts } from '../model/data2.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(){
    return this.http.get<Contacts[]>(`${environment2.apiUrl}/contacts`);
  }

  getContact(id: number){
    return this.http.get<Contacts>(`${environment2.apiUrl}/contacts/${id}`);
  }

  saveContacts(data: Contacts, id?: number){
    if(id){
      return this.http.put(`${environment2.apiUrl}/contacts/${id}`, data);
    }
    return this.http.post(`${environment2.apiUrl}/contacts`, data);
  }

  deleteContacts(id: number){
    return this.http.delete(`${environment2.apiUrl}/contacts/${id}`);
  }
}
