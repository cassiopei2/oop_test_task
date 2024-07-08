import { GameGenre } from "../enums/game.enum";
import { Game, GameEntity, GameI } from "./game.entity";

export class ShooterGame extends GameEntity {
    genre    = GameGenre.SHOOTER;
    discount = 10;

    constructor(data: GameI) {
        super(data);
    }
}
