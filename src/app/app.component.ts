import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { TranslateService } from './services/translate/translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  public authority: string;

  constructor(private tokenStorage: TokenStorageService,private translate: TranslateService) {
      console.log(translate.data);
   }

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
    this.translate.use(string);
  }

  logout() {
    this.tokenStorage.signOut();
    window.location.reload();
  }
}