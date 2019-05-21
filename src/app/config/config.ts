enum GameMode{
    STANDARD,
}

export class Config{

    gameName: String;
    dimension:number;
    ownerStarts:boolean;
    gameMode:GameMode;


    constructor(gameName:String, dimension:String, ownerStarts:boolean, gameMode:GameMode ){
        this.gameName = gameName;
        this.dimension =+dimension;
        this.ownerStarts = ownerStarts;
        this.gameMode = gameMode;
    }

}