// import { Player } from "./player";
import { User } from "./interface";
export class Dealer implements User {
    private firstCard: number = 0;
    private sencondCard: number = 0;
    protected cardNum: number = 0;
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

    cardReset(): void {
        this.cardNum = 0;
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

    stand(): boolean {
        return true;
    }

    getCardNum(): number {
        return this.cardNum;
    }
}
