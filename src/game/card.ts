export class Card {
    private card: number[] = [];

    cardAdd(cardNum: number): void {
        this.card.push(cardNum);
    }

    pop(): number {
        let random: number = Math.floor(Math.random() * this.card.length + 1);
        let returnNum = this.card[random];
        this.card.splice(random, 1);
        return returnNum;
    }

    getCardLength(): number {
        return this.card.length;
    }
}
