class Dealer extends Player {
    private firstCard: number;
    private sencondCard: number;

    constructor(firstCard: number, sencondCard: number) {
        super();
        this.firstCard = firstCard;
        this.sencondCard = sencondCard;
        this.cardNum = firstCard + sencondCard;
    }
}
