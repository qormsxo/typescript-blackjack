import * as readline from "readline-sync";
import { Card } from "./card";
import { Player } from "../player/player";
import { Rule } from "./rule";
import { Dealer } from "../player/dealer";
type result = "blackJack" | "draw" | "win" | "lose" | "nothing";
type isStand = {
    playerStand: boolean;
    dealerStand: boolean;
};
class Game {
    public play() {
        let card: Card = new Card();
        let player: Player = new Player(10000);
        let dealer: Dealer = new Dealer();
        let rule: Rule = new Rule();

        console.log("Black Jack");
        console.log("Press any key to continue...");

        readline.question("");

        main: while (true) {
            this.reset(player, dealer, rule); // 시작전에 리셋
            card.cardCreate(); // 카드덱 만들기
            this.bettingMoney(player, rule); //베팅하기
            let result: result = this.firstReceive(player, dealer, rule, card);
            if (result !== "nothing") {
                dealer.showCard();
                player.showCard();
                player.setMoney(player.getMoney() + rule.resultfun(result));
                continue main;
            }
            result = this.mainGame(player, dealer, rule, card);
            player.setMoney(player.getMoney() + rule.resultfun(result));
        }
    }

    private bettingMoney(player: Player, rule: Rule): void {
        console.log("Your Money : " + player.getMoney());
        while (true) {
            let betInput: number = readline.questionInt("plz betMoney (100 units)");
            if (betInput % 100 === 0) {
                rule.setBetMoney(betInput);
                player.bet(betInput);
                break;
            }
            console.log("Betting money must be 100 units");
        }
    }

    private firstReceive(player: Player, dealer: Dealer, rule: Rule, card: Card): result {
        player.hit(card.pop());
        player.hit(card.pop());
        dealer.setCard(card.pop());
        dealer.setCard(card.pop());

        let gamerResult = rule.jugde(player.getCardNum());
        let dealerResult = rule.jugde(dealer.getCardNum());
        if (gamerResult > dealerResult) {
            console.log("blackJack!");
            return "blackJack";
        } else if (gamerResult > 1 && dealerResult > 1) {
            console.log("draw");
            return "draw";
        } else {
            return "nothing";
        }
    }

    reset(player: Player, dealer: Dealer, rule: Rule): void {
        player.reset();
        rule.setBetMoney(0);
        dealer.reset();
    }

    private mainGame(player: Player, dealer: Dealer, rule: Rule, card: Card): result {
        while (!player.getStand() || !dealer.getStand()) {
            player.showCard();
            dealer.showCard();
            if (!player.getStand()) {
                let input: number = parseInt(readline.keyIn("1.hit 2.stand ", { limit: "$<1-2>" }));
                if (input == 1) {
                    console.log("hit");
                    player.hit(card.pop());
                    // 히트를 했는데 버스트 났음
                    if (!rule.jugde(player.getCardNum())) {
                        console.log("Bust");
                        player.showCard();
                        return "lose";
                        break;
                    }
                } else {
                    // 스탠드
                    player.stand();
                }
            }
            if (!dealer.getStand()) {
                if (dealer.getCardNum() < 17) {
                    // 딜러는 16이하면 무조건 히트
                    console.log("Dealer hit");
                    dealer.hit(card.pop());
                    if (!rule.jugde(dealer.getCardNum())) {
                        console.log("Dealer Bust");
                        player.showCard();
                        dealer.showCard();
                        return "win";
                        break;
                    }
                } else {
                    console.log("Dealer stand");
                    dealer.stand();
                }
            }
        }
        player.showCard();
        dealer.showCard();
        return player.getCardNum() > dealer.getCardNum() ? "win" : player.getCardNum() === dealer.getCardNum() ? "draw" : "lose";
    }
}

export default Game;
