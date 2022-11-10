export interface User {
    hit(hitCardNum: number): void;

    stand(): boolean;

    getCardNum(): number;

    cardReset(): void;

    is11(currCardNum: number, newCardNum: number): number;

    showCard(): void;
}
