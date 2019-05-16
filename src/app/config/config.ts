enum GameMode{
    STANDARD,
}

export class Config{

    gameName: String;
    dimension:number;
    doesOwnerStart:boolean;
    gameMode:GameMode;


    constructor(gameName:String, dimension:String, doesOwnerStart:boolean, gameMode:GameMode ){
        this.gameName = gameName;
        this.dimension =+dimension;
        this.doesOwnerStart = doesOwnerStart;
        this.gameMode = gameMode;
    }

}