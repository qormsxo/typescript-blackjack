abstract class Player {
    protected cardNum = 0;

    hit(hitCardNum: number): void {
        this.cardNum += hitCardNum;
    }

    stand(): boolean {
        return true;
    }

    getCardNum(): number {
        return this.cardNum;
    }
}
