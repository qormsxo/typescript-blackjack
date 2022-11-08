export interface PlayerInterface {
    cardNum: number;

    hit(hitCardNum: number): void;

    stand(): boolean;

    getCardNum(): number;
}
