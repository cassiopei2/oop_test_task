import { GameGenre } from "../enums/game.enum";
import { GameEntity, GameI } from "./game.entity";

export class RaceGame extends GameEntity {
    genre    = GameGenre.RACE;
    discount = 20;

    constructor(data: GameI) {
        super(data);
    }
}
