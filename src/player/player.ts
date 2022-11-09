import { PlayerInterface } from "./interface";

export class Player implements PlayerInterface {
    protected cardNum: number = 0;

    // 게임이 끝났을때 카드 초기화
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
