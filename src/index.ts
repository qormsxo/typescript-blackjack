import Game from "./game/game";

const main = {
    play: () => {
        const game: Game = new Game();
        game.play();
    },
};
main.play();
