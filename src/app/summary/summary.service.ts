import { Injectable } from '@angular/core';
import { serverUrl } from '../app.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {


  private summaryUrl = serverUrl + '/api/wkbp/get/game/summary/';

  constructor(private http: HttpClient) { }

  getSummary(id): Observable<string> {
    return this.http.get(this.summaryUrl+id, { responseType: 'text' });
  }

}
