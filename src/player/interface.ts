export interface User {
    hit(hitCardNum: number): void;

    doStand(): void;

    getCardNum(): number;

    reset(): void;

    isStand(): boolean;

    is11(currCardNum: number, newCardNum: number): number;

    showCard(): void;

    userChoice():number;
}
