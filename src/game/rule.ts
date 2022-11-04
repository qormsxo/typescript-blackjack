class Rule {
    private betMoney = 0;

    setBetMoney(betMoney: number) {
        this.betMoney = betMoney;
    }

    jugde(cardNum: number) {}

    lose(): void {
        this.betMoney = 0;
    }
    win(): number {
        return this.betMoney * 2;
    }
    blackjack(): number {
        return this.betMoney * 1.5;
    }
}
