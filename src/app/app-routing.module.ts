import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { GameComponent } from './game/game.component';
import { ConfigComponent } from './config/config.component';
import { RandomshipsComponent } from './randomships/randomships.component';
import { SummaryComponent } from './summary/summary.component';
import { HowtoplayComponent } from './howtoplay/howtoplay.component';


const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'game/:id',
        component: GameComponent
    },
    {
        path: 'game/summary/:id',
        component: SummaryComponent
    },
    {
        path: 'config',
        component: ConfigComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'howtoplay',
        component: HowtoplayComponent
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'ships_placement/:id',
        component: RandomshipsComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
