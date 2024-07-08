export interface GameI {
    name: string;
    year: number;
}

export interface Game extends GameI {
    info(): string;
}

export class GameEntity implements Game {
    discount: number = 0;
    name: string;
    year: number;

    constructor(data: GameI) {
        this.name = `*${data.name}*`;
        this.year = data.year;
    }

    info(): string {
        return `${this.name} (${this.year}) - Discount: ${this.discount}%`;
    }
}
