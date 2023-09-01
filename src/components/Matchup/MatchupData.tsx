import { PlayerData } from "../Player/PlayerData";

export class MatchupData {
    constructor(public homeTeamName: string, public awayTeamName: string, public playerDatas : PlayerData[]) {}
}