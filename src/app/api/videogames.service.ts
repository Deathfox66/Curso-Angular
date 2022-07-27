import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Videogames } from '../model/data.model';

@Injectable({
  providedIn: 'root'
})
export class VideogamesService {

  constructor(private http: HttpClient) { }
  getVideogames(){
    return this.http.get<Videogames[]>(`${environment.apiUrl}/videogames`);
  }

  getVideogame (id: number){
    return this.http.get<Videogames>(`${environment.apiUrl}/videogames/${id}`);
  }

  saveVideogames(data: Videogames){
    return this.http.post(`${environment.apiUrl}/videogames`, data);
  }

  deleteVideogames(id: number){
    return this.http.delete(`${environment.apiUrl}/videogames/${id}`);
  }
}
