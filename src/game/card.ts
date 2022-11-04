class Card {
    private card: number[] = [];

    cardAdd(cardNum: number): void {
        this.card.push(cardNum);
    }

    pop(): number {
        return Math.random() * this.card.length + 1;
    }
}
