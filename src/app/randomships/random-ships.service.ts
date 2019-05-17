import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RandomShipsService {

  private shipUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/ship_randomize/';
  private createUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/ships_placement/';

  constructor(private http: HttpClient) { }

  getShips(id): Observable<string> {
    return this.http.get(this.shipUrl+id, { responseType: 'text' });
  }

  getCreateGame(id):Observable<string>{
    return this.http.get(this.createUrl+id,{responseType: 'text'})
  }
  
}
