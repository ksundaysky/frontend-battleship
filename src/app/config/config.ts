enum GameType{
    DEFAULT
}

export class Config{

    name: String;
    dimensions:number;
    whoStarts:boolean;
    gameType:GameType;


    constructor(name:String, dimensions:String, whoStarts:boolean, gameType:GameType ){
        this.name = name;
        this.dimensions=+dimensions;
        this.whoStarts=whoStarts;
        this.gameType=gameType;
    }

}