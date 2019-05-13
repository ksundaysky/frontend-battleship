enum GameType{
    DEFAULT
}

export class Config{

    dimensions:number;
    whoStarts:boolean;
    gameType:GameType;


    constructor(dimensions:String, whoStarts:boolean, gameType:GameType ){
        this.dimensions=+dimensions;
        this.whoStarts=whoStarts;
        this.gameType=gameType;
    }

}