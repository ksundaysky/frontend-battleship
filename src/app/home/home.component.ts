import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenStorageService } from '../auth/token-storage.service';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  info: any;
  errorMessage: String;
  listOfAllGames: String[];
  listOfAllPlayers = [''];


  constructor(private token: TokenStorageService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {

    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };

    this.getListOfGames();  
  }

  getListOfGames() {

    // -> get/gameslist
    this.homeService.getAllGames().subscribe(
      data => {
        this.listOfAllGames = JSON.parse(data);
        console.log(this.listOfAllGames);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

  getListOfPlayers() {
    
     // -> get/gameslist
     this.homeService.getAllPlayers().subscribe(
      data => {
        this.listOfAllPlayers = JSON.parse(data);
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

  joinGame(event) {
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    const endpointPath = 'ships_placement/' + value;
    this.router.navigateByUrl(endpointPath);
  }
}
