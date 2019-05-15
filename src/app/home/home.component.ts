import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';

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

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
