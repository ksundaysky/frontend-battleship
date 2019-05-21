import { Field } from "./field";

export class ShotOutcome{
    playerTurn:boolean;
    field:Field;
    playerWon:boolean;

    constructor(playerTurn:boolean, field:Field, playerWon:boolean){
        this.playerTurn = playerTurn;
        this.field = field;
        this.playerWon=playerWon;
    }
}