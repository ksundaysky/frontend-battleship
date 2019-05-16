import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private playerGames = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/playerGames';

  constructor(private http: HttpClient) { }

  getGames(): Observable<string> {
    return this.http.get(this.playerGames, { responseType: 'text' });
  }
  
}
