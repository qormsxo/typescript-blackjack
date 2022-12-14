export class Card {
    private card: number[];

    constructor(card: number[]) {
        this.card = card;
    }

    pop(): number {
        let random: number = Math.floor(Math.random() * this.card.length + 1);
        let returnNum = this.card[random];
        this.card.splice(random, 1);
        return returnNum;
    }

    public cardCreate(): void {
        if (this.card.length < 2) {
            this.createCardDeck();
        }
    }

    private createCardDeck() {
        // 제너레이터
        // 3벌로 카드 덱만들기
        for (let i = 0; i < 3; i++) {
            let iterator = this.createNum();
            for (let value of iterator) {
                this.card.push(value);
            }
        }
    }
    private *createNum() {
        let i: number = 1;
        let count: number = 0;
        //조커를 제외한 52장
        while (count < 52) {
            yield i;
            count++;
            if (count >= 36) {
                // J Q K A 는 10인걸 고려해서 count 갯수로 숫자 판단
                i = 10;
            } else if (count % 4 === 0) {
                // 문양이 4개이므로 문양마다 숫자를 넣었다면 숫자 증가
                i++;
            }
        }
        return 0;
    }
}
