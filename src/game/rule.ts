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

export class Rule {
    private betMoney = 0;

    public setBetMoney(betMoney: number) {
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
    public winloss = {
        win: this.win,
        blackJack: this.blackjack,
        draw: this.draw,
        lose: this.lose,
    };

    private lose(): number {
        this.betMoney = 0;
        return 0;
    }
    private win(): number {
        console.log(this.betMoney * 2);
        return this.betMoney * 2;
    }
    private draw(): number {
        return this.betMoney;
    }
    private blackjack(): number {
        return this.betMoney * 1.5;
    }
}
