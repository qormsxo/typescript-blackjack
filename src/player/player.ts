// import { Player } from './player';
import { User } from "./interface";

export class Player implements User {
    private money: number;
    private cardNum: number = 0;

    private isStand: boolean = false;

    constructor(money: number) {
        this.money = money;
    }

    setMoney(money: number): void {
        this.money = money;
    }

    bet(betMoney: number): void {
        this.money -= betMoney;
    }

    getMoney(): number {
        return this.money;
    }
    showCard(): void {
        console.log("Your Card Number : ", this.getCardNum());
    }

    reset(): void {
        this.cardNum = 0;
        this.isStand = false;
    }
    hit(hitCardNum: number): void {
        hitCardNum = this.is11(this.cardNum, hitCardNum);
        this.cardNum += hitCardNum;
    }

    is11(currCardNum: number, newCardNum: number): number {
        // 1을 11로 바꿔도 버스트가 나지 않을때 (A 는 1 아님 11임)
        if (newCardNum === 1 && currCardNum + 11 <= 21) {
            console.log("1을 11로 변환");
            return 11;
        } else {
            return newCardNum;
        }
    }

    getStand(): boolean {
        return this.isStand;
    }

    stand(): void {
        this.isStand = true;
    }

    getCardNum(): number {
        return this.cardNum;
    }
}
