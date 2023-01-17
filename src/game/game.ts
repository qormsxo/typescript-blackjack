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
    private card: Card;
    private player: Player;
    private dealer: Dealer;
    private rule: Rule;
    private readonly hitInput :number = 1
    constructor(){
        this.card= new Card(new Array());
        this.player = new Player(10000, 0, false);
        this.dealer = new Dealer(0, 0, 0, false);
        this.rule = new Rule(0);
    }

    public play() {

        console.log("Black Jack");
        console.log("Press any key to continue...");

        readline.question("");

        main: while (true) {
            console.log("\n")
            // 시작 전에 리셋 
            this.player.reset();
            this.rule.setBetMoney(0);
            this.dealer.reset();
            
            this.card.cardCreate(); 
            this.bettingMoney(); 
            this.cardReceive();
            let result: result = this.firstJugde()
            if (result !== "nothing") {
                this.dealer.showCard();
                this.player.showCard();
                this.player.setMoney(this.player.getMoney() + this.rule.resultfun(result));
                continue main;
            }
            result = this.mainGame();
            this.player.setMoney(this.player.getMoney() + this.rule.resultfun(result));
        }
    }

    private bettingMoney(): void {
        console.log("Your Money : " + this.player.getMoney());
        while (true) {
            let betInput: number = readline.questionInt("plz betting Money (100 units)");
            if (betInput % 100 === 0) {
                this.rule.setBetMoney(betInput);
                this.player.bet(betInput);
                break;
            }
            console.log("Betting money must be 100 units");
        }
    }

    private cardReceive() : void{
        this.player.hit(this.card.pop());
        this.player.hit(this.card.pop());
        this.dealer.setCard(this.card.pop());
        this.dealer.setCard(this.card.pop());
    }
    // 처음으로 카드를 받았을때 의 판정
    private firstJugde(): result {
        let gamerResult = this.rule.jugde(this.player.getCardNum());
        let dealerResult = this.rule.jugde(this.dealer.getCardNum());
        let firstResult:result;
        if (gamerResult > dealerResult) {
            console.log("blackJack!");
            firstResult =  "blackJack";
        } else if (gamerResult > 1 && dealerResult > 1) {
            console.log("draw");
            firstResult =  "draw";
        } else {
            firstResult = "nothing";
        }
        return firstResult
    }

    private mainGame(): result {
        while (!this.player.isStand() || !this.dealer.isStand()) {
            this.player.showCard();
            this.dealer.showCard();

            let playerChoice: number = this.player.userChoice();
            if (playerChoice === this.hitInput) {
                console.log("hit");
                this.player.hit(this.card.pop());
                // 히트를 했는데 버스트 났음
                if (!this.rule.jugde(this.player.getCardNum())) {
                    console.log("Bust");
                    this.player.showCard();
                    return "lose";
                }
            } else {
                // 스탠드
                this.player.doStand();
            }

            let dealerChoice:number = this.dealer.userChoice();
            if (dealerChoice === this.hitInput) {
                // 딜러는 16이하면 무조건 히트
                console.log("Dealer hit");
                this.dealer.hit(this.card.pop());
                if (!this.rule.jugde(this.dealer.getCardNum())) {
                    console.log("Dealer Bust");
                    this.player.showCard();
                    this.dealer.showCard();
                    return "win";
                }
            } else {
                console.log("Dealer stand");
                this.dealer.doStand();
            }
            
        }
        this.player.showCard();
        this.dealer.showCard();
        return this.player.getCardNum() > this.dealer.getCardNum() ? "win" : this.player.getCardNum() === this.dealer.getCardNum() ? "draw" : "lose";
    }
}

export default Game;
