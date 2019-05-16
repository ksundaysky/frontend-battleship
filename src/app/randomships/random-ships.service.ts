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

  private shipUrl = 'https://battleship-wkbp-server.herokuapp.com/api/wkbp/get/ships_placement';

  constructor(private http: HttpClient) { }

  getShips(): Observable<string> {
    return this.http.get(this.shipUrl, { responseType: 'text' });
  }

  
}
