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

  private gameUrl = 'https://battleship-wkbp-server.herokuapp.com/api/test/game';
  private shotUrl = 'https://battleship-wkbp-server.herokuapp.com/api/test/game/shot';
  private shipUrl = 'https://battleship-wkbp-server.herokuapp.com/api/test/game/ships';

  constructor(private http: HttpClient) { }

  getGame(): Observable<string> {
    return this.http.get(this.gameUrl, { responseType: 'text' });
  }

  getShips(): Observable<string> {
    return this.http.get(this.shipUrl, { responseType: 'text' });
  }

  postShot(field:Field): Observable<string> {
    return this.http.post<string>(this.shotUrl,field, httpOptions);
  }
}
