import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummaryService } from './summary.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {

  gameId:number;
  constructor(private activatedRoute: ActivatedRoute, private summaryService: SummaryService) { }

  ngOnInit() {
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    // this.summaryService.getSummary(this.gameId).subscribe(
    //   date=>{

    //   },
    //   error=>{

    //   }
    // );

  }

}
