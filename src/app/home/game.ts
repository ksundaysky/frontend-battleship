
export class Game {

    gameId: number;
    gameState: string;
    gameName: string;
    dimensions: number;
    gameMode: string;

    constructor(gameId: number,
        gameState: string,
        gameName: string,
        dimensions: number,
        gameMode: string) {
            
        this.gameId = gameId;
        this.gameState = gameState;
        this.gameName = gameName;
        this.dimensions = dimensions;
        this.gameMode = gameMode;

    }
}