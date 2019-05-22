import { Field } from "./field";

export class ShotOutcome{
    playerTurn:boolean;
    field:Field;
    playerWon:boolean;
    message:string;

    constructor(playerTurn:boolean, field:Field, playerWon:boolean,message:string){
        this.playerTurn = playerTurn;
        this.field = field;
        this.playerWon=playerWon;
        this.message=message;
    }
}