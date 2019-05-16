import { Component, OnInit } from '@angular/core';

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
  allGames = [
    {
    "name": "Gra",
    "dimension": 1,
  },
  {
    "name": "Gra2",
    "dimension": 2,
    
  },
  {
    "name": "Gra3",
    "dimension": 3,
  },
  {
    "name": "Gra2",
    "dimension": 4,
    
  }
  ]
  errorMessage: string;
  listOfAllGames: String[];

  constructor(private token: TokenStorageService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.getListOfGames();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  getListOfGames(){
    this.homeService.getAllGames().subscribe(
      data=>{
        console.log(data);
        var listOfGames: Array<String> = JSON.parse(data);
        console.log(listOfGames);
        this.listOfAllGames=listOfGames;
      },
      error=>{
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    )
  }

  joinGame(event){
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    var str1 = new String( "ships_placement/" ); 
    var str2 = value;
    var str3 = str1.concat( str2 );
    this.router.navigateByUrl(str3);
  }
}
