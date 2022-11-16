export interface User {
    hit(hitCardNum: number): void;

    stand(): void;

    getCardNum(): number;

    reset(): void;

    getStand(): boolean;

    is11(currCardNum: number, newCardNum: number): number;

    showCard(): void;
}
