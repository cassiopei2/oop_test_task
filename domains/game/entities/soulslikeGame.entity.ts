import { GameGenre } from "../enums/game.enum";
import { GameEntity, GameI } from "./game.entity";

export class SoulslikeGame extends GameEntity {
    genre    = GameGenre.SOULS_LIKE;
    discount = 35;

    constructor(data: GameI) {
        super(data);
    }
}
