import { v4 } from "uuid";
import { Game, GameI } from "../../game/entities/game.entity";

export interface GamerI {
    id?: string;
    nickname: string;
    gender: string;
    games?: GameI[];
}

export class Gamer implements GamerI {
    id: string;
    nickname: string;
    gender: string;
    games: GameI[];

    constructor(data: GamerI) {
        this.id = !data?.id ? v4() : data.id;
        this.nickname = data.nickname;
        this.gender = data.gender;
        this.games = data.games ?? [];
    }

    hasGame(gameName: string): boolean {
        return this.games.some(game => game.name === gameName);
    }

    addGame(game: GameI): void {
        this.games.push(game);
    }

    removeGame(game: Game): void {
        this.games = this.games.filter(g => g.name !== game.name);
    }
}
