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
  summaries:Summary;
  gameName:string;
  constructor(private activatedRoute: ActivatedRoute, private summaryService: SummaryService) { }

  ngOnInit() {
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.summaryService.getSummary(this.gameId).subscribe(
      data=>{
        this.summaries = JSON.parse(data);
        this.gameName = this.summaries[0].gameName;
      },
      error=>{
      }
    );
  }

}
