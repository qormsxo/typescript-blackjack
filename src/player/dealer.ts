import { Player } from "./player";
export class Dealer extends Player {
    private firstCard: number = 0;
    private sencondCard: number = 0;

    constructor() {
        super();
    }

    setCards(firstCard: number, sencondCard: number) {
        this.firstCard = firstCard;
        this.sencondCard = sencondCard;
        this.cardNum = firstCard + sencondCard;
    }

    getFristCardNum(): number {
        return this.firstCard;
    }
}
