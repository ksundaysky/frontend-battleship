import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private allGames = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/gameslist';


  constructor(private http: HttpClient) { }

  getAllGames(): Observable<string> {
    return this.http.get(this.allGames, { responseType: 'text' });
  }
}
