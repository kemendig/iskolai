//először a html és a css fut le, hogy ne fusson hibára
document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('sudoku-board');
    const messageElement = document.getElementById('message');
    const cells = [];

//tábla létrehozása
    function createBoard(board) {
        boardElement.innerHTML = '';
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cells.push(cellElement);
                if (board[row][col] !== null) {
                    cellElement.textContent = board[row][col];
                    cellElement.classList.add('fixed');
                } else {
                    const inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.maxLength = 1;
                    inputElement.addEventListener('input', () => {
                        const value = inputElement.value;
                        if (value < 1 || value > 9 || isNaN(value)) {
                            inputElement.value = '';
                        } else {
                            checkCell(row, col, parseInt(value));
                        }
                    });
                    cellElement.appendChild(inputElement);
                }
                boardElement.appendChild(cellElement);
            }
        }
    }
// Cellák tartalmának az ellenőrzése
    function checkCell(row, col, num) {
        const cellElement = cells[row * 9 + col];
        const isFixed = cellElement.classList.contains('fixed');
        const isValid = isValidMove(randomBoard, row, col, num);
        cellElement.classList.remove('correct', 'incorrect');
        if (!isFixed) {
            cellElement.classList.add(isValid ? 'correct' : 'incorrect');
        }
    }
//Ellenőrzi az összes cellát
    function checkBoard(board) {
        let isComplete = true;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const cellElement = cells[row * 9 + col];
                if (!cellElement.classList.contains('fixed')) {
                    const inputElement = cellElement.querySelector('input');
                    const value = parseInt(inputElement.value);
                    const isValid = isValidMove(board, row, col, value);
                    cellElement.classList.remove('correct', 'incorrect');
                    if (value && isValid) {
                        cellElement.classList.add('correct');
                    } else {
                        cellElement.classList.add('incorrect');
                        isComplete = false;
                    }
                }
            }
        }

        if (isComplete) {
            messageElement.textContent = 'Gratulálunk, minden szám helyes!';
        } else {
            messageElement.textContent = '';
        }
    }
//megfelelősséget ellenőriz a cellákban 
    function isValidMove(board, row, col, num) {
        for (let x = 0; x < 9; x++) {
            if (board[row][x] === num || board[x][col] === num) {
                return false;
            }
        }
        const startRow = Math.floor(row / 3) * 3;
        const startCol = Math.floor(col / 3) * 3;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[startRow + i][startCol + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }

    function generateRandomBoard() {
        const board = Array.from({ length: 9 }, () => Array(9).fill(null));

        function fillBoard() {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (board[i][j] === null) {
                        const numbers = shuffleArray([...Array(9).keys()].map(x => x + 1));
                        for (let number of numbers) {
                            if (isValidMove(board, i, j, number)) {
                                board[i][j] = number;
                                if (isBoardFull(board) || fillBoard()) {
                                    return true;
                                }
                                board[i][j] = null;
                            }
                        }
                        return false;
                    }
                }
            }
            return true;
        }

        function isBoardFull(board) {
            return board.every(row => row.every(cell => cell !== null));
        }

        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        fillBoard();

        for (let i = 0; i < 40; i++) {
            const row = Math.floor(Math.random() * 9);
            const col = Math.floor(Math.random() * 9);
            board[row][col] = null;
        }

        return board;
    }

    const randomBoard = generateRandomBoard();
    createBoard(randomBoard);

    document.getElementById('check-button').addEventListener('click', () => checkBoard(randomBoard));
});
