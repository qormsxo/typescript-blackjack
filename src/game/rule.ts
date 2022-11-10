type result = {
    BUST: number;
    NONE: number;
    BLACKJACK: number;
};

const RESULT: result = {
    BUST: 0,
    NONE: 1,
    BLACKJACK: 2,
};

type winloss = {
    win: () => number;
    blackJack: () => number;
    draw: () => number;
    lose: () => number;
};

export class Rule {
    private betMoney: number = 0;

    public setBetMoney(betMoney: number): void {
        this.betMoney = betMoney;
    }

    public jugde(cardNum: number): number {
        if (cardNum > 21) {
            return RESULT.BUST;
        } else if (cardNum === 21) {
            return RESULT.BLACKJACK;
        } else {
            return RESULT.NONE;
        }
    }

    public lose(): number {
        this.betMoney = 0;
        return 0;
    }
    public win(): number {
        return this.betMoney * 2;
    }
    public draw(): number {
        return this.betMoney;
    }
    public blackjack(): number {
        return this.betMoney * 1.5;
    }
}
