import { Gamer } from "../../gamer/entities/gamer.entity";
import { ValidateLength } from "../../../shared/decorators/validateLength.decorator";

export interface CommunityI {
    gamers: Gamer[];
}

export class Community implements CommunityI {
    gamers: Gamer[] = [];

    constructor(private data: CommunityI) {
        this.gamers = data.gamers ?? [];
    }

    @ValidateLength<CommunityI>(2,
                                'gamers')
    addGamer(gamer: Gamer): Gamer[] {
        this.gamers.push(gamer);
        return this.gamers;
    }

    @ValidateLength<CommunityI>(2,
                                'gamers')
    removeGamer(gamer: Gamer): Gamer[] {
        this.gamers = this.gamers.filter(g => g.id !== gamer.id);
        return this.gamers;
    }

    @ValidateLength<CommunityI>(2,
                                'gamers')
    listGamers(): void {
        console.log('Gamers:',
                    JSON.stringify(this.gamers));
    }


    /**
     * Get all gamers games and determine 3 most popular games
     * Sort games by popularity
     */
    @ValidateLength<CommunityI>(2,
                                'gamers')
    popularGames(): void {
        let games: string[] = [];
        this.gamers.forEach(gamer => {
            games = [...games, ...gamer.games.map(game => game.name)];
        });
        const gamesCount: { [key: string]: number; } = games.reduce((acc: { [key: string]: number; },
                                                                     game) => {
                                                                        acc[game] = (acc[game] || 0) + 1;
                                                                        return acc;
                                                                    },
                                                                    {});

        const sortedGames = Object.entries(gamesCount)
            .sort((
                      a,
                      b) => b[1] - a[1])
            .slice(0,
                   3)
            .map(([game]) => game);

        console.log('Popular games:',
                    sortedGames);
    }
}



