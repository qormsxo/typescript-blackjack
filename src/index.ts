function* createNum() {
    let i: number = 1;
    let count: number = 0;
    while (count < 52) {
        yield i;
        count++;
        if (count >= 36) {
            i = 10;
        } else if (count % 4 === 0) {
            i++;
        }
    }
    return 0;
}

let numAry: number[] = [];

for (let i = 0; i < 3; i++) {
    let iterator = createNum();
    for (let value of iterator) {
        numAry.push(value);
    }
}

console.log(numAry);
console.log(numAry.length);
