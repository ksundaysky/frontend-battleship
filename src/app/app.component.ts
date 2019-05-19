import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { TranslateService } from './services/translate/translate.service';

export const serverUrl = 'https://battleship-wkbp-server.herokuapp.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})


export class AppComponent implements OnInit {
  private roles: string[];
  public authority: string;
  languages = ['pl','en'];
  

  constructor(private tokenStorage: TokenStorageService, private translate: TranslateService) {   }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        this.authority = 'user';
        return true;
      });
    }

  }

  setLang(string) {
    if(this.languages.includes(string)){
      this.translate.use(string);
    }else{
      console.log("Wrong language specified");
      this.translate.use('en');
    }
    
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}
