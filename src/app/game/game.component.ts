import { Component, OnInit, AfterViewInit, DoCheck } from '@angular/core';
import { GameService } from './game.service';
import { Field } from './field';
import * as $ from 'jquery';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit, AfterViewInit,DoCheck {
  

  levelsInBoard: number[];
  clickedCells = [''];
  shipCells = [];
  colorShips = [{"id":67,"stateOfField":"OCCUPIED"},{"id":77,"stateOfField":"OCCUPIED"},{"id":87,"stateOfField":"OCCUPIED"},{"id":97,"stateOfField":"OCCUPIED"},{"id":17,"stateOfField":"OCCUPIED"},{"id":18,"stateOfField":"OCCUPIED"},{"id":19,"stateOfField":"OCCUPIED"},{"id":54,"stateOfField":"OCCUPIED"},{"id":64,"stateOfField":"OCCUPIED"},{"id":74,"stateOfField":"OCCUPIED"},{"id":42,"stateOfField":"OCCUPIED"},{"id":52,"stateOfField":"OCCUPIED"},{"id":36,"stateOfField":"OCCUPIED"},{"id":46,"stateOfField":"OCCUPIED"},{"id":93,"stateOfField":"OCCUPIED"},{"id":94,"stateOfField":"OCCUPIED"},{"id":4,"stateOfField":"OCCUPIED"},{"id":72,"stateOfField":"OCCUPIED"},{"id":60,"stateOfField":"OCCUPIED"},{"id":1,"stateOfField":"OCCUPIED"}]
  currentMessage: string;
  info:  string;
  errorMessage: string;
  shotUnabled: boolean = false;

  constructor( private gameService: GameService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.levelsInBoard = [0,1,2,3,4,5,6,7,8,9];
  }

  ngAfterViewInit(): void {
    this.getShips();
  
    interval(3000).subscribe( i=>{
      console.log("SIEMA MR GINO2");
      this.shotUnabled=true;
    })
  
  }

  ngDoCheck(): void {
  
  }

  

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
  
 
  
  onClick(event){
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue; 
    
    if(this.shotUnabled==false){
      this.openSnackBar('Nie Twoja kolej!','CZEKEJ')
    }else{
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
  }

  static highlightFields(values){
        const id = '#'+values.toString();
        console.log(id)
        $(id).addClass('fired');
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

  randomShipsColor(randomShips){
    for(let ships of randomShips){
          const id = '#'+ships.id+'L';
          $(id).addClass('ships');
    }
  }

  getShips(){

    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.gameService.getShips(id).subscribe(
      data =>{
        var shipLocations: Array<String> = JSON.parse(data);
        this.randomShipsColor(shipLocations);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
