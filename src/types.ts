export enum GamesTypeEnum {
    CRICKET = "Cricket",
    FOOTBALL = "Football",
    TENNIS = "Tennis",
    BASKETBALL = "BasketBall",
}

export enum GameHiglightEnum {
    LIVE = "Live",
    TODAY = "Today",
    UPCOMING = "Upcoming",
    TRENDING = "Trending",
}

export enum MenuListEnum {
    BROWSE = "Browse",
    MYBET = "Bet Slip",
    ACCOUNT = "Account",
}
export type BetSlipType = {
    label: string;
    selectedTeam: string;
    selectedBet: string;
    odds: number;
};
export type TeamOddsType = {
    team1: string;
    team2: string;
    back1: number;
    lay1: number;
    back2: number;
    lay2: number;
};
