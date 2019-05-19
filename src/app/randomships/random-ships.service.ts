import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {serverUrl} from '../app.component';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RandomShipsService {

  private shipUrl =   serverUrl + '/api/wkbp/get/ship_randomize/';
  private createUrl = serverUrl + '/api/wkbp/get/ships_placement/';

  constructor(private http: HttpClient) { }

  getShips(id): Observable<string> {
    return this.http.get(this.shipUrl+id, { responseType: 'text' });
  }

  getCreateGame(id):Observable<string>{
    return this.http.get(this.createUrl+id,{responseType: 'text'})
  }
  
}
