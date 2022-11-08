import { Player } from "./player";
export class Dealer extends Player {
    private firstCard: number = 0;
    private sencondCard: number = 0;

    constructor() {
        super();
    }

    setCard(newCardNum: number): void {
        if (!this.firstCard) {
            this.firstCard = newCardNum;
        } else {
            this.sencondCard = newCardNum;
        }
        newCardNum = this.is11(this.cardNum, newCardNum);
        this.cardNum += newCardNum;
    }

    getFristCardNum(): number {
        return this.firstCard;
    }
}
