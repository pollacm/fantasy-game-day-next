export class PlayerData {
    constructor(public order: number,public playerName: string, public incomingPlayerName: string, public playerPosition: string, public playerPoints: number, public incomingPlayerPoints: number, public playerPointDiff: number, public playerLastUpdate: string, 
        public isStarter: boolean) {}
}