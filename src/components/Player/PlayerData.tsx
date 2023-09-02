export class PlayerData {
    constructor(public position: number,public homePlayerName: string, public homeIncomingPlayerName: string, public homePlayerPosition: string, public homePlayerPoints: number, public homeIncomingPlayerPoints: number, public homePlayerPointDiff: number, public homePlayerLastUpdate: string, 
        public awayPlayerName: string, public awayIncomingPlayerName: string, public awayPlayerPosition: string, public awayPlayerPoints: number, public awayIncomingPlayerPoints: number, public awayPlayerPointDiff: number, public awayPlayerLastUpdate: string, 
        public isStarter: boolean) {}
}