import * as readline from "readline-sync";
import { Card } from "./card";
import { Player } from "../player/player";
import { Rule } from "./rule";
import { Dealer } from "../player/dealer";
type result = "blackJack" | "draw" | "win" | "lose" | "continue";
type isStand = {
    playerStand: boolean;
    dealerStand: boolean;
};
class Game {
    private card: Card;
    private player: Player;
    private rule: Rule;
    private dealer: Dealer;

    constructor(card: Card, player: Player, dealer: Dealer, rule: Rule) {
        this.card = card;
        this.player = player;
        this.dealer = dealer;
        this.rule = rule;
    }

    public play() {}
}
