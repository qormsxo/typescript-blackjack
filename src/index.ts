import { Card } from "./game/card";
import { Rule } from "./game/rule";
import { Dealer } from "./player/dealer";
import { Gamer } from "./player/gamer";
import * as readline from "readline-sync";

let main = {
    game: () => {
        let card: Card = new Card(); // 카드 객체 생성

        let gamer: Gamer = new Gamer();
        let dealer: Dealer = new Dealer();
        let rule: Rule = new Rule();
        console.log("Black Jack");
        console.log("Press any key to continue...");

        readline.question("");
        while (true) {
            if (card.getCardLength() < 2) {
                console.log("22");
                for (let i = 0; i < 3; i++) {
                    let iterator = main.createNum();
                    for (let value of iterator) {
                        card.cardAdd(value);
                    }
                }
            }
            console.log("your Money : ", gamer.getMoney());
            main.bettingMoney(rule, gamer);

            dealer.setCard(card.pop());
            dealer.setCard(card.pop());
            gamer.hit(card.pop());
            gamer.hit(card.pop());

            console.log("Your Card Number : ", gamer.getCardNum());
            console.log(rule.jugde(gamer.getCardNum()));

            console.log("Dealer First Card Number)", dealer.getFristCardNum());
            console.log(rule.jugde(dealer.getCardNum()));

            let input: number = readline.questionInt("");
        }
    },
    createNum: function* () {
        let i: number = 1;
        let count: number = 0;
        while (count < 52) {
            yield i;
            count++;
            if (count >= 36) {
                i = 10;
            } else if (count % 4 === 0) {
                i++;
            }
        }
        return 0;
    },
    bettingMoney: (rule: Rule, gamer: Gamer): void => {
        let betInput: number;
        while (true) {
            betInput = readline.questionInt("plz betMoney (100 units)");
            if (betInput % 100 === 0) {
                break;
            }
            console.log("Betting money must be 100 units");
        }
        rule.setBetMoney(betInput);
        gamer.bet(betInput);
    },
};

main.game();
