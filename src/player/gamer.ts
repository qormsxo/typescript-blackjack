import { Player } from "./player";

export class Gamer extends Player {
    private money: number = 10000;
    constructor() {
        super();
    }

    setMoney(money: number): void {
        this.money = money;
    }

    bet(betMoney: number): void {
        this.money -= betMoney;
    }
    setCardNum(cardNum: number): void {
        this.cardNum = cardNum;
    }

    getMoney(): number {
        return this.money;
    }
}
