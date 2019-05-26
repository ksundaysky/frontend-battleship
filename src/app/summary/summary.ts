export class Summary {
    gameName: string;
    user: string;
    isWinner: boolean;
    shots: number;
    hits: number;
    ratio: number;


    constructor(gameName: string, user: string, isWinner: boolean, shots: number, hits: number, ratio: number) {
        this.gameName = gameName;
        this.user = user;
        this.isWinner = isWinner;
        this.shots = shots;
        this.hits = hits;
        this.ratio = ratio;
    }

}