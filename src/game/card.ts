export class Card {
    private card: number[] = [];

    cardAdd(cardNum: number): void {
        this.card.push(cardNum);
    }

    pop(): number {
        let random: number = Math.random() * this.card.length + 1;
        return this.card[Math.floor(random)];
    }

    getCardLength(): number {
        return this.card.length;
    }
}
