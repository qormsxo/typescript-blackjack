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
    private player: Player;
    private rule: Rule;
    private dealer: Dealer;

    constructor(player: Player, dealer: Dealer, rule: Rule) {
        this.player = player;
        this.dealer = dealer;
        this.rule = rule;
    }

    public play() { }
}
