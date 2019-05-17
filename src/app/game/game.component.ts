import { Component, OnInit, AfterViewInit, DoCheck, OnDestroy } from '@angular/core';
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

export class GameComponent implements OnInit, AfterViewInit, OnDestroy {


  levelsInBoard: number[];
  clickedCells = [''];
  shipCells = [];
  currentMessage: string;
  info:  string;
  errorMessage: string;
  shotUnabled: boolean = false;
  loop: any;

  constructor( private gameService: GameService, private activatedRoute: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.levelsInBoard = [0,1,2,3,4,5,6,7,8,9];
  }

  ngAfterViewInit(): void {
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));
    this.getShips();
  
    this.loop = interval(500).subscribe( i=>{
      console.log("SIEMA MR GINO 4");
      this.gameService.getTurn(id).subscribe(
        data => {
          this.shotUnabled = JSON.parse(data);
          console.log(data)  
       },
       error => {
         this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
       }
      );
    }
    )
    
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }


  ngOnDestroy(): void {
    this.loop.unsubsrcribe();
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
      this.openSnackBar('Nie tutaj GAŁGANIE','CZEKEJ')
     
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
    let id = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    console.log(JSON.parse(JSON.stringify(field)));
    this.gameService.postShot(field,id).subscribe(
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
