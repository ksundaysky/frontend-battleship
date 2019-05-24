import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { GameService } from './game.service';
import { Field } from './field';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { interval, Subscription, Observable, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ShotOutcome } from './shotOutcome';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, OnDestroy {


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
  updateMyBoard: ShotOutcome;
  permission: boolean = true;
  gameReady: boolean;
  counter: number;

  private subscriptionReady: Subscription;
  private subscriptionTurn: Subscription;

  timerTurn$: Observable<number> = timer(0, 1000);
  timerReady$: Observable<number> = timer(0, 3000);

  private alive = true;
  gameId: number;
  turnMessage: string;

  constructor(private router: Router, private gameService: GameService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.levelsInBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.gameService.getPermission(this.gameId).subscribe(
      data=>{
        this.permission = true;
        // JSON.parse(data);
      },
      error=>{
        this.permission = false;
        // JSON.parse(error);
      }
    )

    this.gameReady = false;

    this.getShips();

    this.subscriptionReady = this.timerReady$.subscribe(i => {

      this.gameService.getReady(this.gameId).subscribe(
        data => {
          console.log('sie pytam sie czy redy gra ');
          console.log(JSON.parse(JSON.stringify(data)));
          this.gameReady = JSON.parse(data);
          console.log('gameredy ' + this.gameReady);
          if (this.gameReady == true) {
            this.askForTurn();
          }
        },
        error => {
        }
      );
    }
    );
  }

  getPermission() {
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));
    this.gameService.getPermission(this.gameId).subscribe(
      data => {
        console.log('mam permiszyn');
        console.log("co to " + JSON.stringify(data));
        this.permission = JSON.parse(JSON.stringify(data));
      },
      error => {
        console.log('nie mam permiszyn');
        console.log(JSON.stringify(error));
        this.permission = JSON.parse(error);
      }
    );
  }
  askForTurn() {

    this.subscriptionReady.unsubscribe();
    this.subscriptionTurn = this.timerTurn$.subscribe(i => {
      this.gameService.getTurn(this.gameId).subscribe(
        data => {
          this.turnMessage= "";
          // console.log('sie pytam sie');
          this.updateMyBoard = JSON.parse(data);
          console.log(this.updateMyBoard);
          this.shotUnabled = this.updateMyBoard.playerTurn;
          console.log(this.shotUnabled);
          var dateObj = Date.now();
          var formatted = new DatePipe("en-US").transform(dateObj, 'yyyy-MM-dd HH:mm:ss');
          console.log('dupa' + this.updateMyBoard);
          if (this.updateMyBoard.message != null) {
            $('.textarea').append(formatted + " " + this.updateMyBoard.message + "\n");
          }
          if (this.updateMyBoard.playerWon === true) {
            this.openSnackBar('Gerka skonczona Przegrana :(', 'ELOOOOOOO'); // redirect needed
            this.router.navigateByUrl('game/summary/' + this.gameId.toString());
          }
          if (this.shotUnabled === true) {
            // this.openSnackBar("Your turn", 'CZEKEJ')
            this.turnMessage = "TWOJA KOLEJ";
          }
          if (this.updateMyBoard.field != null) {
            console.log(this.shipCells);
            if (this.shipCells.includes(this.updateMyBoard.field.id)) {
              //iksik
              this.shipHitX(this.updateMyBoard.field.id, 'L');
            } else {
              //czerwone
              this.shipMissedColor(this.updateMyBoard.field.id, 'L');
            }
          }
          this.counter = 0;
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    }
    );
  }
  
  shipHitX(id, ch) {
    const fieldId = '#' + id + ch;
    console.log('field id = ' + fieldId);
    $(fieldId).addClass('cross');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionTurn != null) {
      this.subscriptionTurn.unsubscribe();
    }
    this.openSnackBar("Przegrałeś mordo", "MORDO");
  }

  onClick(event) {
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    this.counter++;
    if (this.shotUnabled == false || this.counter > 1) { // TODO do przemyślenia mechanizm blokowania!
      this.openSnackBar('Wait! its not your turn!', 'WAIT')
    } else {
      this.postShot(value.substring(0, value.length - 1));
    }
  }

  postShot(value) {
    let field = new Field(value);

    console.log(JSON.parse(JSON.stringify(field)));
    this.gameService.postShot(field, this.gameId).subscribe(
      data => {
        this.shotOutcome = JSON.parse(JSON.stringify(data));
        console.log('shot outcome: ' + this.shotOutcome.playerWon);
        console.log(this.shotOutcome.playerTurn);
        console.log('lista filtóf '+this.shotOutcome.neighbourFieldsOfSunkenShip);
        console.log(this.shotOutcome);

        if (this.shotOutcome.playerWon === true) {
          this.openSnackBar('Gerka skonczona  WYGRANA :)', 'ELOOOOOOO'); // redirect needed
          this.router.navigateByUrl('game/summary/' + this.gameId.toString());
        }
        if(this.shotOutcome.neighbourFieldsOfSunkenShip != null){
          for (let field of this.shotOutcome.neighbourFieldsOfSunkenShip) {
            const id = '#' + field.id + 'R';
            $(id).addClass('fired');
          }
        }
        if (this.shotOutcome.playerTurn === true) {
          this.shipHitColor(this.shotOutcome.field.id);
        }
        else {
          this.shipMissedColor(this.shotOutcome.field.id, 'R');
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
    console.log('field id = ' + fieldId);
    $(fieldId).addClass('hit');
  }

  shipMissedColor(id, ch) {
    const fieldId = '#' + id + ch;
    console.log('field id = ' + fieldId);
    $(fieldId).addClass('fired');
  }

  getShips() {
    this.gameService.getShips(this.gameId).subscribe(
      data => {
        var shipLocations: Array<String> = JSON.parse(data);
        this.randomShipsColor(shipLocations);
        this.addIdToList(shipLocations);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  addIdToList(list) {
    for (let ships of list) {
      this.shipCells.push(ships.id);
    }
  }
}
