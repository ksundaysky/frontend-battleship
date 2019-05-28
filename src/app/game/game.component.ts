import { InstructionComponent } from './../instruction/instruction.component';
import { HowtoplayComponent } from './../howtoplay/howtoplay.component';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { GameService } from './game.service';
import { Field } from './field';
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig, MatBottomSheet } from '@angular/material';
import {Subscription, Observable, timer } from 'rxjs';
import { ShotOutcome } from './shotOutcome';
import { DatePipe } from '@angular/common';
import { SummaryService } from './summary.service';
import { Summary } from './summary';
import { TranslateService } from '../services/translate/translate.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})

export class GameComponent implements OnInit, OnDestroy {

  levelsInBoard: number[];
  levelsInBoard1: number[];
  clickedCells = [''];
  shipCells = [];
  currentMessage: string;
  info: string;
  errorMessage: string;
  shotUnabled = false;
  loop: any;
  multiply = 10;
  shotOutcome: ShotOutcome;
  updateMyBoard: ShotOutcome;
  permission = true;
  gameReady: boolean;
  counter: number;

  private subscriptionReady: Subscription;
  private subscriptionTurn: Subscription;

  timerTurn$: Observable<number> = timer(0, 1000);
  timerReady$: Observable<number> = timer(0, 3000);

  private alive = true;
  gameId: number;
  turnMessage: string;
  gameEnded = false;

  summaries: Summary;
  gameName: string;
  isDisabled = false;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private gameService: GameService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar, private summaryService: SummaryService, private translate: TranslateService, private bottomSheet: MatBottomSheet) { }

  ngOnInit() {
    this.levelsInBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.gameId = parseInt(this.activatedRoute.snapshot.paramMap.get('id'));

    this.gameService.getPermission(this.gameId).subscribe(
      data => {
        this.permission = true;
      },
      error => {
        this.permission = false;
      }
    );

    this.gameReady = false;

    this.getShips();

    this.subscriptionReady = this.timerReady$.subscribe(i => {

      this.gameService.getReady(this.gameId).subscribe(
        data => {
          this.gameReady = JSON.parse(data);
          if (this.gameReady === true) {
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
        this.permission = JSON.parse(JSON.stringify(data));
      },
      error => {
        this.permission = JSON.parse(error);
      }
    );
  }
  askForTurn() {
    this.subscriptionReady.unsubscribe();
    this.subscriptionTurn = this.timerTurn$.subscribe(i => {
      this.gameService.getTurn(this.gameId).subscribe(
        data => {
          this.turnMessage = '';
          this.updateMyBoard = JSON.parse(data);
          this.shotUnabled = this.updateMyBoard.playerTurn;
          const dateObj = Date.now();
          const formatted = new DatePipe('en-US').transform(dateObj, 'yyyy-MM-dd HH:mm:ss');
          var textarea = document.getElementById('textarea');
          textarea.scrollTop = textarea.scrollHeight;
          if (this.updateMyBoard.message != null) {
            $('.textarea').append(formatted + ' ' + this.updateMyBoard.message + '\n');
          }
          if (this.updateMyBoard.playerWon === true) {
            this.openSnackBar(this.translatePopUp('LOST'), 'lostPop'); // redirect needed
            this.summaryService.getSummary(this.gameId).subscribe(
              summaryData => {
                this.summaries = JSON.parse(summaryData);
                this.gameName = this.summaries[0].gameName;
              },
              error => {
              }
            );
            this.gameEnded = true;
            this.isDisabled = true;
            if (this.subscriptionTurn != null) {
              this.subscriptionTurn.unsubscribe();
            }
          }
          if (this.shotUnabled === true) {
            this.turnMessage = 'YOUR TURN';
          } else {
            this.turnMessage = 'NOT YOUR TURN';
          }
          if (this.updateMyBoard.field != null) {
            if (this.shipCells.includes(this.updateMyBoard.field.id)) {
              this.shipHitX(this.updateMyBoard.field.id, 'L');
            } else {
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
    $(fieldId).addClass('cross');
  }

  openSnackBar(message: string, color: string) {
    this.snackBar.open(message, '', {
      duration: 2000,
      panelClass: [color]
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionTurn != null) {
      this.subscriptionTurn.unsubscribe();
    }
    this.gameService.getEndGame(this.gameId).subscribe(
      data => {
      },
      error => {
      }
    );
    this.openSnackBar(this.translatePopUp('ENDGAME'), 'endGamePop');
  }

      translatePopUp(toTranslate: string) {
        return this.translate.data[toTranslate] || toTranslate;
      }

  onClick(event) {
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    this.counter++;
    if (this.shotUnabled === false || this.counter > 1) { // TODO do przemyślenia mechanizm blokowania!
      this.openSnackBar(this.translatePopUp('NOT YOUR TURN'), 'notTurnPop');
    } else {
      this.postShot(value.substring(0, value.length - 1));
    }
  }

  postShot(value) {
    const field = new Field(value);
    this.gameService.postShot(field, this.gameId).subscribe(
      data => {
        this.shotOutcome = JSON.parse(JSON.stringify(data));
        
        if (this.shotOutcome.playerWon === true) {
          this.openSnackBar(this.translatePopUp('WON'), 'green'); // redirect needed

          this.summaryService.getSummary(this.gameId).subscribe(
            summaryData => {
              this.summaries = JSON.parse(summaryData);
              this.gameName = this.summaries[0].gameName;
            },
            error => {
            }
          );
          this.isDisabled = true;
          this.gameEnded = true;
          if (this.subscriptionTurn != null) {
            this.subscriptionTurn.unsubscribe();
          }
        }
        if (this.shotOutcome.neighbourFieldsOfSunkenShip != null) {
          for (const neighbourField of this.shotOutcome.neighbourFieldsOfSunkenShip) {
            const id = '#' + neighbourField.id + 'R';
            $(id).addClass('fired');
          }
        }
        if (this.shotOutcome.playerTurn === true) {
          this.openSnackBar(this.translatePopUp('HIT'), 'hitPop');
          this.shipHitColor(this.shotOutcome.field.id);
        } else {
          this.openSnackBar(this.translatePopUp('MISSED'), 'missedPop');
          this.shipMissedColor(this.shotOutcome.field.id, 'R');
        }
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  makeBoardDisabled() {
    const toBeDisabled = document.getElementsByClassName('battleshipBoard');

    $('.container').addClass('disabled');

  }

  randomShipsColor(randomShips) {
    for (const ships of randomShips) {
      const id = '#' + ships.id + 'L';
      $(id).addClass('ships');
    }
  }

  shipHitColor(id) {
    const fieldId = '#' + id + 'R';
    $(fieldId).addClass('hit');
  }

  shipMissedColor(id, ch) {
    const fieldId = '#' + id + ch;
    $(fieldId).addClass('fired');
  }

  getShips() {
    this.gameService.getShips(this.gameId).subscribe(
      data => {
        const shipLocations: Array<String> = JSON.parse(data);
        this.randomShipsColor(shipLocations);
        this.addIdToList(shipLocations);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  capitulate() {
    if (this.subscriptionTurn != null) {
      this.subscriptionTurn.unsubscribe();
    }
    this.gameService.getEndGame(this.gameId).subscribe(
      data => {
      },
      error => {
      }
    );
    this.gameEnded=true;
    this.openSnackBar(this.translatePopUp('ENDGAME'), 'endGamePop');
    this.router.navigateByUrl('home');
  }

  addIdToList(list) {
    for (const ships of list) {
      this.shipCells.push(ships.id);
    }
  }

  openBottomSheet(): void {
    this.bottomSheet.open(InstructionComponent);
  }
}
