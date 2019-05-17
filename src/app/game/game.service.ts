import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Field } from './field';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/game_config';
  private shotUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/post/game/shoot';
  private shipUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/game/';
  private turnUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/turn/';

  constructor(private http: HttpClient) { }

  getGame(): Observable<string> {
    return this.http.get(this.gameUrl, { responseType: 'text' });
  }

  getTurn(id): Observable<string> {
    return this.http.get(this.gameUrl+id, { responseType: 'text' });
  }

  getShips(id): Observable<string> {
    return this.http.get(this.shipUrl+id, { responseType: 'text' });
  }

  postShot(field:Field): Observable<string> {
    return this.http.post<string>(this.shotUrl,field, httpOptions);
  }
}
