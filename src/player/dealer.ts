// import { Player } from "./player";
import { User } from "./interface";
export class Dealer implements User {
    private firstCard: number;
    private sencondCard: number;
    protected cardNum: number;

    private stand: boolean;

    constructor(firstCard: number, sencondCard: number, cardNum: number, stand: boolean) {
        this.firstCard = firstCard;
        this.sencondCard = sencondCard;
        this.cardNum = cardNum;
        this.stand = stand;
    }
    userChoice(): number {
        let choiceNumber : number;
        if (!this.isStand()) {
            if (this.getCardNum() < 17) {
                // 딜러는 16이하면 무조건 히트
                choiceNumber = 1;
            } else {
                console.log("Dealer stand");
                choiceNumber =2
            }
        }else{
            choiceNumber=2
        }
        return choiceNumber
    }

    // 처음에만
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

    showCard(): void {
        console.log("Dealer Card Number : ", this.getCardNum());
    }

    reset(): void {
        this.cardNum = 0;
        this.firstCard = 0;
        this.sencondCard = 0;
    }
    hit(hitCardNum: number): void {
        hitCardNum = this.is11(this.cardNum, hitCardNum);
        this.cardNum += hitCardNum;
    }

    is11(currCardNum: number, newCardNum: number): number {
        // 1을 11로 바꿔도 버스트가 나지 않을때
        if (newCardNum === 1 && currCardNum + 11 <= 21) {
            console.log("1을 11로 변환");
            return 11;
        } else {
            return newCardNum;
        }
    }

    doStand(): void {
        this.stand = true;
    }
    isStand(): boolean {
        return this.stand;
    }

    getCardNum(): number {
        return this.cardNum;
    }
}
