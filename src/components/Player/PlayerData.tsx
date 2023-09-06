export class PlayerData {
    constructor(public order: number,public subOrder: number, public playerName: string, public incomingPlayerName: string, public playerPosition: string, public playerPoints: number, public incomingPlayerPoints: number, public playerPointDiff: number, public playerLastUpdate: string, 
        public subbedOutFor: string, public subbedInFor: string, public matchupPosition: string, public subPoints: number, public captainPoints: number, public isStarter: boolean) {}
}