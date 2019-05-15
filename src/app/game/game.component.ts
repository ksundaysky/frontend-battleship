import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Field } from './field';
import * as $ from 'jquery';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
  levelsInBoard: number[];
  clickedCells = [''];
  shipCells = [];
  currentMessage: string;
  info:  string;
  errorMessage: string;
  constructor( private gameService: GameService) { }

  
  ngOnInit() {
    this.levelsInBoard = [0,1,2,3,4,5,6,7,8,9];

    this.gameService.getGame().subscribe(
      data => { 
        this.info =data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
  );
  }

  onClick(event){
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue; 
    
    this.postShot(value.substring(0, value.length-1));
    console.log(value);

    if(!this.clickedCells.includes(value)){
      GameComponent.highlightFields(value);
      this.clickedCells.push(value);
      this.currentMessage='';
    }
    else{
      this.currentMessage='nie tutaj galganie';
      }
    }

  static highlightFields(values){
        const id = '#'+values.toString();
        console.log(id)
        $(id).addClass('fired');
  }

  shot(value){
    let field = new Field(value);

    this.gameService.getShips().subscribe(
      data => {
         this.info = JSON.stringify(data);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
  );
  }

  postShot(value){

    let field = new Field(value);
    console.log(field);

    console.log(JSON.parse(JSON.stringify(field)));
    this.gameService.postShot(field).subscribe(
      data => {
         this.info = JSON.parse(JSON.stringify(data));
         console.log(this.info);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
  );
  }

  static randomShipsColor(randomShips){
    for(let ships of randomShips){
          const id = '#'+ships+'L';
          $(id).addClass('ships');
    }
  }

  randomShips(){

    for(const filed of this.shipCells){
      console.log(document.getElementById(filed+'L').classList.remove("ships"))
    }

    this.shipCells = [];
    this.gameService.getShips().subscribe(
      data =>{
        console.log(data);
        var shipLocations: Array<Field> = JSON.parse(data);
        for(const ship of shipLocations){
        
          if(ship.stateOfField.toString()=="OCCUPIED"){
            this.shipCells.push(ship.id);
          }
        }
        GameComponent.randomShipsColor(this.shipCells);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  
  }

}
