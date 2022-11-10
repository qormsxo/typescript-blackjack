import { Card } from "./game/card";
import { Rule } from "./game/rule";
import { Dealer } from "./player/dealer";
import { Player } from "./player/player";
import * as readline from "readline-sync";
type result = "blackJack" | "draw" | "win" | "lose" | "continue";
type isStand = {
    playerStand: boolean;
    dealerStand: boolean;
};

let main = {
    game: () => {
        let card: Card = new Card(); // 카드 객체 생성

        let player: Player = new Player(10000);
        let dealer: Dealer = new Dealer();
        let rule: Rule = new Rule();
        let result: result;
        let isStand: isStand = {
            playerStand: false,
            dealerStand: false,
        };
        console.log("Black Jack");
        console.log("Press any key to continue...");

        readline.question("");
        main: while (true) {
            // 겜시작 전에 전부 초기화
            main.reset(player, dealer, rule, isStand);
            // 카드가 2개 이하가 되면 다시 덱 추가
            if (card.getCardLength() < 2) {
                main.createCardDeck(card);
            }
            console.log("your Money : ", player.getMoney());
            // 베팅
            main.bettingMoney(rule, player);

            dealer.setCard(card.pop());
            dealer.setCard(card.pop());
            player.hit(card.pop());
            player.hit(card.pop());

            result = main.firstJugde(player.getCardNum(), dealer.getCardNum(), rule);
            if (result !== "continue") {
                dealer.showCard();
                player.setMoney(player.getMoney() + main.resultfun(rule, result)); // 결과에 따라 리턴 값 더하기 지면 0을 더함
                continue main;
            }

            let input: number = 1;
            gameWhile: while (!isStand.dealerStand || !isStand.playerStand) {
                player.showCard();
                dealer.showCard();

                if (!isStand.playerStand) {
                    input = parseInt(readline.keyIn("1.hit 2.stand ", { limit: "$<1-2>" }));
                    if (input == 1) {
                        console.log("hit");
                        player.hit(card.pop());
                        // 히트를 했는데 버스트 났음
                        if (!rule.jugde(player.getCardNum())) {
                            console.log("Bust");
                            player.showCard();
                            player.setMoney(player.getMoney() + rule.lose());
                            continue main;
                            // break gameWhile; 이게 맞나 싶긴해
                        }
                    } else {
                        isStand.playerStand = player.stand();
                    }
                }

                if (dealer.getCardNum() < 17) {
                    // 딜러는 16이하면 무조건 히트
                    console.log("dealer hit");
                    dealer.hit(card.pop());
                    if (!rule.jugde(dealer.getCardNum())) {
                        console.log("dealer Bust");
                        player.showCard();
                        dealer.showCard();
                        player.setMoney(player.getMoney() + rule.win());
                        continue main;
                    }
                } else {
                    console.log("dealer stand");
                    isStand.dealerStand = dealer.stand();
                }
            }
            result = main.judge(player.getCardNum(), dealer.getCardNum());
            if (result != "continue") player.setMoney(player.getMoney() + main.resultfun(rule, result));
        }
    },
    reset: (player: Player, dealer: Dealer, rule: Rule, isStand: isStand): void => {
        player.cardReset();
        rule.setBetMoney(0);
        dealer.cardReset();
        isStand.dealerStand = false;
        isStand.playerStand = false;
    },
    firstJugde: (playerCardNum: number, delalerCardNum: number, rule: Rule): result => {
        let gamerResult = rule.jugde(playerCardNum);
        let dealerResult = rule.jugde(delalerCardNum);
        if (gamerResult > dealerResult) {
            console.log("blackJack!");
            return "blackJack";
        } else if (gamerResult > 1 && dealerResult > 1) {
            console.log("draw");
            return "draw";
        } else {
            return "continue";
        }
    },
    judge: (playerCardNum: number, delalerCardNum: number): result => {
        if (playerCardNum > delalerCardNum) {
            console.log("win!");
            return "win";
        } else if (playerCardNum === delalerCardNum) {
            console.log("draw");
            return "draw";
        } else {
            console.log("lose");
            return "lose";
        }
    },
    createCardDeck: (card: Card): void => {
        // 제너레이터
        let createNum = function* () {
            let i: number = 1;
            let count: number = 0;
            //조커를 제외한 52장
            while (count < 52) {
                yield i;
                count++;
                if (count >= 36) {
                    // J Q K A 는 10인걸 고려해서 count 갯수로 숫자 판단
                    i = 10;
                } else if (count % 4 === 0) {
                    // 문양이 4개이므로 문양마다 숫자를 넣었다면 숫자 증가
                    i++;
                }
            }
            return 0;
        };
        // 3벌로 카드 덱만들기
        for (let i = 0; i < 3; i++) {
            let iterator = createNum();
            for (let value of iterator) {
                card.cardAdd(value);
            }
        }
    },

    // 돈 베팅
    bettingMoney: (rule: Rule, player: Player): void => {
        let betInput: number;
        while (true) {
            betInput = readline.questionInt("plz betMoney (100 units)");
            if (betInput % 100 === 0) {
                break;
            }
            console.log("Betting money must be 100 units");
        }
        rule.setBetMoney(betInput);
        player.bet(betInput);
    },
    delay: (ms: number) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    },
    resultfun: (rule: Rule, result: result): number => {
        switch (result) {
            case "blackJack":
                return rule.blackjack();
                break;
            case "draw":
                return rule.draw();
                break;
            case "win":
                return rule.win();
            case "lose":
                return rule.lose();
            case "continue":
                throw new Error("진짜 말도안되는 에러");
        }
    },
};

main.game();
export default main;
