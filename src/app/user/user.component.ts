import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;
  games = [{
    "name": "Gra",
    "dimension": 1,
  },
  {
    "name": "Gra2",
    "dimension": 2,

  }
  ]

  constructor(private userService: UserService) { }

  ngOnInit() {
  }
  joinGame(event) {
    const value = (event.target || event.srcElement || event.currentTarget).attributes.id.nodeValue;
    console.log(value);
  }
}
