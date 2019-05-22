import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummaryService } from './summary.service';
import { Summary } from './summary';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  gameId:number;
  summary:Summary;
  constructor(private activatedRoute: ActivatedRoute, private summaryService: SummaryService) { }

  ngOnInit() {
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.summaryService.getSummary(this.gameId).subscribe(
      data=>{
        this.summary = JSON.parse(data);
        console.log(this.summary);
      },
      error=>{
        console.log('cos poszlo nie tak :(')
      }
    );
  }

}
