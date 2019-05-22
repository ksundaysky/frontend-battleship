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
  listOfAllPlayers = [''];
  

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getListOfPlayers();
  }

  getListOfPlayers() {
    
    // -> get/gameslist
    this.userService.getAllPlayers().subscribe(
     data => {
       this.listOfAllPlayers = JSON.parse(data);
     },
     error => {
       this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
     }
   )
 }
}
