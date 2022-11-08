export class Rule {
    private betMoney = 0;

    setBetMoney(betMoney: number) {
        this.betMoney = betMoney;
    }

    jugde(cardNum: number): Object {
        if (cardNum > 21) {
            return { result: "bust" };
        } else if (cardNum === 21) {
            return { result: "blackJack" };
        } else {
            return { result: "none" };
        }
    }

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
