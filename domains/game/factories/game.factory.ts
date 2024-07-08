import { GameGenre } from "../enums/game.enum";
import { GameI } from "../entities/game.entity";
import { SoulslikeGame } from "../entities/soulslikeGame.entity";
import { ShooterGame } from "../entities/shooterGame.entity";
import { RaceGame } from "../entities/raceGame.entity";

export class GameFactory {
    create(
        game: GameGenre,
        data: GameI) {
        switch (game) {
            case GameGenre.SOULS_LIKE:
                return new SoulslikeGame(data);
            case GameGenre.SHOOTER:
                return new ShooterGame(data);
            case GameGenre.RACE:
                return new RaceGame(data);
            default:
                throw new Error('Invalid game genre');
        }
    }
}
