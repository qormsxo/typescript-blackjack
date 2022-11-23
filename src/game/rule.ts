type jugdeResult = {
    BUST: number;
    NONE: number;
    BLACKJACK: number;
};

const JUGDERESULT: jugdeResult = {
    BUST: 0,
    NONE: 1,
    BLACKJACK: 2,
};

type result = "blackJack" | "draw" | "win" | "lose" | "nothing";

export class Rule {
    private betMoney: number = 0;

    constructor(betMoney: number) {
        this.betMoney = betMoney;
    }

    public setBetMoney(betMoney: number): void {
        this.betMoney = betMoney;
    }

    public jugde(cardNum: number): number {
        if (cardNum > 21) {
            return JUGDERESULT.BUST;
        } else if (cardNum === 21) {
            return JUGDERESULT.BLACKJACK;
        } else {
            return JUGDERESULT.NONE;
        }
    }

    resultfun(result: result): number {
        switch (result) {
            case "blackJack":
                return this.blackjack();
            case "draw":
                return this.draw();
            case "win":
                return this.win();
            case "lose":
                return this.lose();
            case "nothing":
                throw new Error("진짜 말도안되는 에러");
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
