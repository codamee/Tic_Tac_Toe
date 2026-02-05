function cell() {
    let value = 0;
    const addValue = (player) => {
        value = player;
    };
    const getValue = () => value;

    return { addValue, getValue };
}

const gameBoard = (() => {
    let rows = 3;
    let columns = 3;
    let board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoard = () => board;
    const insertMarker = (row, column, player) => {
        let cell = board[row][column];
        cell.addValue(player);
    };

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                // Reset each cell to 0
                board[i][j].addValue(0);
            }
        }
    };

    const printBoard = () => {
        let value = board.map((row) => row.map((column) => column.getValue()));
        console.log(value);
    };

    return { printBoard, getBoard, insertMarker, resetBoard };
})();

function gameController() {
    let board = gameBoard.getBoard();
    let winStatus;
    let players = [
        {
            name: "playerOne",
            marker: "X",
        },
        {
            name: "playerTwo",
            marker: "O",
        },
    ];

    const setPlayersName = (name1, name2) => {
        players[0].name = name1;
        players[1].name = name2;
    };

    let activePlayer = players[0];
    const getActivePlayer = () => activePlayer;
    const switchPlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const winPatterns = [
        [
            [0, 0],
            [0, 1],
            [0, 2],
        ],
        [
            [1, 0],
            [1, 1],
            [1, 2],
        ],
        [
            [2, 0],
            [2, 1],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 0],
            [2, 0],
        ],
        [
            [0, 1],
            [1, 1],
            [2, 1],
        ],
        [
            [0, 2],
            [1, 2],
            [2, 2],
        ],
        [
            [0, 0],
            [1, 1],
            [2, 2],
        ],
        [
            [0, 2],
            [1, 1],
            [2, 0],
        ],
    ];

    const playRound = (row, column) => {
        if (gameBoard.getBoard()[row][column].getValue() !== 0) {
            console.log("spot already taken");
            return;
        }
        gameBoard.insertMarker(row, column, activePlayer.marker);
        gameBoard.printBoard();
        winStatus = winPatterns.some((pattern) => {
            let [a, b, c] = pattern;
            const valA = gameBoard.getBoard()[a[0]][a[1]].getValue();
            const valB = gameBoard.getBoard()[b[0]][b[1]].getValue();
            const valC = gameBoard.getBoard()[c[0]][c[1]].getValue();
            return valA !== 0 && valA === valB && valA === valC;
        });
        if (!winStatus && !checkDraw()) {
            switchPlayer();
        }
    };

    const getWinStatus = () => winStatus;
    const checkDraw = () => {
        return gameBoard
            .getBoard()
            .every((row) => row.every((cell) => cell.getValue() !== 0));
    };

    return {
        playRound,
        getActivePlayer,
        setPlayersName,
        getWinStatus,
        checkDraw,
    };
}
function screenUi() {
    let game = gameController();
    let boardElem = document.querySelector(".board");
    let submitBtn = document.querySelector("#submitBtn");
    let formContainer = document.querySelector(".form");
    let display = document.querySelector(".referee");
    let playerTurn = document.querySelector(".playerTurn");

    submitBtn.addEventListener("click", () => {
        let player1 = document.querySelector("#playerOne");
        let player2 = document.querySelector("#playerTwo");
        if (player1.value && player2.value) {
            game.setPlayersName(player1.value, player2.value);
        }
        gameBoard.resetBoard();
        boardUi();
        playerTurn.textContent = game.getActivePlayer().name + " Turn now";
        player1.value = "";
        player2.value = "";
        formContainer.classList.add("hidden");
    });

    const boardUi = () => {
        boardElem.innerHTML = "";
        gameBoard.getBoard().forEach((row, rowIndex) =>
            row.forEach((column, columnIndex) => {
                let divElem = document.createElement("div");
                divElem.classList.add("cell");
                divElem.dataset.row = rowIndex;
                divElem.dataset.column = columnIndex;
                divElem.textContent =
                    column.getValue() == 0 ? "" : column.getValue();
                boardElem.append(divElem);
            }),
        );
    };
    boardUi();

    boardElem.addEventListener("click", (e) => {
        let row = e.target.dataset.row;
        let column = e.target.dataset.column;
        if (row !== undefined && column !== undefined) {
            game.playRound(row, column);
            boardUi();
            if (game.getWinStatus() === true) {
                display.textContent = `${game.getActivePlayer().name} Won the Game ! Restart Again`;
                formContainer.classList.remove("hidden");
            } else if (game.checkDraw()) {
                display.textContent = `Match is draw ! Restart Again`;
                formContainer.classList.remove("hidden");
            } else {
                playerTurn.textContent =
                    game.getActivePlayer().name + " Turn now";
            }
        }
    });
}
screenUi();
