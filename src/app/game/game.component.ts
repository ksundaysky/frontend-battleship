import { Component, OnInit, AfterViewInit, DoCheck, OnDestroy } from '@angular/core';
import { GameService } from './game.service';
import { Field } from './field';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { interval, Subscription, Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShotOutcome } from './shotOutcome';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, AfterViewInit, OnDestroy {


  levelsInBoard: number[];
  clickedCells = [''];
  shipCells = [];
  currentMessage: string;
  info: string;
  errorMessage: string;
  shotUnabled: boolean = false;
  loop: any;
  multiply = 10;
  shotOutcome: ShotOutcome;

  private subscription: Subscription;
  timer$:Observable<number> = timer(0,1000);
  private alive = true;

  constructor(private gameService: GameService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.levelsInBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  ngAfterViewInit(): void {
    const id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getShips();
    
    this.subscription = this.timer$.subscribe(i => {
      this.gameService.getTurn(id).subscribe(
        data => {
          console.log('sie pytam sie');
          this.shotUnabled = JSON.parse(data);
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    }
    );

  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }



  onClick(event) {
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    if (this.shotUnabled == false) {
      this.openSnackBar('Wait! its not your turn!', 'WAIT')
    } else {
      this.postShot(value.substring(0, value.length - 1));
    }
  }

  postShot(value) {
    let field = new Field(value);
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    console.log(JSON.parse(JSON.stringify(field)));
    this.gameService.postShot(field, id).subscribe(
      data => {
        this.shotOutcome = JSON.parse(JSON.stringify(data));
        console.log('shot outcome: '+this.shotOutcome);
        console.log(this.shotOutcome.playerTurn);
        if(this.shotOutcome.playerTurn===true){
          this.shipHitColor(this.shotOutcome.field.id);
        }
        else{
          this.shipMissedColor(this.shotOutcome.field.id);
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  randomShipsColor(randomShips) {
    for (let ships of randomShips) {
      const id = '#' + ships.id + 'L';
      $(id).addClass('ships');
    }
  }

  shipHitColor(id) {
      const fieldId = '#' + id + 'R';
      console.log('field id = '+fieldId);
      $(fieldId).addClass('hit');
  }

  shipMissedColor(id) {
    const fieldId = '#' + id + 'R';
    console.log('field id = '+fieldId);
    $(fieldId).addClass('fired');
}

  getShips() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.gameService.getShips(id).subscribe(
      data => {
        var shipLocations: Array<String> = JSON.parse(data);
        this.randomShipsColor(shipLocations);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
