import { Component, OnInit } from '@angular/core';
import { RandomShipsService } from './random-ships.service';
import { Field } from '../game/field';
import { Router, ActivatedRoute } from '@angular/router'
import * as $ from 'jquery';
import { error } from 'util';


@Component({
  selector: 'app-randomships',
  templateUrl: './randomships.component.html',
  styleUrls: ['./randomships.component.css']
})
export class RandomshipsComponent implements OnInit {

  boardLength: number[];
  shipCells = [];
  errorMessage: string;
  canIStart: boolean;


  constructor(private router: Router, private randomShipsService: RandomShipsService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    this.randomShipsService.getCreateGame(id).subscribe(
      data => {
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    this.boardLength = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  getRandomShips() {

    for (const filed of this.shipCells) {
      document.getElementById(filed + 'L').classList.remove('ships');
    }

    this.shipCells = [];
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.randomShipsService.getShips(id).subscribe(
      data => {
        var shipLocations: Array<Field> = JSON.parse(data);
        for (const ship of shipLocations) {

          if (ship.stateOfField.toString() == "OCCUPIED") {
            this.shipCells.push(ship.id);
          }
        }
        RandomshipsComponent.randomShipsColor(this.shipCells);
        this.canIStart = true;
      },
      error => {
        console.log(error);
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

  static randomShipsColor(randomShips) {
    for (let ships of randomShips) {
      const id = '#' + ships + 'L';
      $(id).addClass('ships');
    }
  }

  goToTheGameRoom() {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    const gameEndpoint = 'game/' + id.toString();
    this.router.navigateByUrl(gameEndpoint);
  }

}
