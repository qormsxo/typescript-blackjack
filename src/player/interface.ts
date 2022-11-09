export interface PlayerInterface {
    hit(hitCardNum: number): void;

    stand(): boolean;

    getCardNum(): number;

    cardReset(): void;
}
