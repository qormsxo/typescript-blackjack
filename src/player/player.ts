// import { Player } from './player';
import { User } from "./interface";
import * as readline from "readline-sync";
export class Player implements User {
    private money: number;
    private cardNum: number;

    private stand: boolean;

    constructor(money: number, cardNum: number, stand: boolean) {
        this.money = money;
        this.cardNum = cardNum;
        this.stand = stand;
    }
    userChoice(): number {
        let input: number;
        if (!this.isStand()) {
            input = parseInt(readline.keyIn("1.hit 2.stand ", { limit: "$<1-2>" }));
        }else{
            input = 2;
        }
        return input;
        
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
        this.stand = false;
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

    isStand(): boolean {
        return this.stand;
    }

    doStand(): void {
        this.stand = true;
    }

    hit(hitCardNum: number): void {
        hitCardNum = this.is11(this.cardNum, hitCardNum);
        this.cardNum += hitCardNum;
    }

    getCardNum(): number {
        return this.cardNum;
    }
}
