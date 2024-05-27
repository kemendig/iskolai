// Amikor a teljes HTML dokumentum betöltődött, fut le ez az eseménykezelő
document.addEventListener('DOMContentLoaded', () => {
    // Kiválasztjuk a Sudoku táblát és az üzenet elemet a HTML dokumentumból
    const boardElement = document.getElementById('sudoku-board');
    const messageElement = document.getElementById('message');
    // Létrehozunk egy üres tömböt, amely a cellákat fogja tárolni
    const cells = [];

    // Tábla létrehozása a megadott board tömb alapján
    function createBoard(board) {
        // Kiürítjük a tábla elem tartalmát
        boardElement.innerHTML = '';
        // Végigmegyünk a tábla sorain és oszlopain
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                // Létrehozunk egy div elemet minden cellához
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                // Hozzáadjuk a cella elemet a cells tömbhöz
                cells.push(cellElement);
                // Ha a cella értéke nem null, akkor azt szövegként jelenítjük meg és fixként jelöljük
                if (board[row][col] !== null) {
                    cellElement.textContent = board[row][col];
                    cellElement.classList.add('fixed');
                } else {
                    // Ha a cella értéke null, létrehozunk egy input elemet
                    const inputElement = document.createElement('input');
                    inputElement.type = 'text';
                    inputElement.maxLength = 1; // Egy karakter hosszúságú lehet csak
                    // Eseménykezelő az input elem változására
                    inputElement.addEventListener('input', () => {
                        const value = inputElement.value;
                        // Ha az érték nem 1 és 9 közötti szám, akkor töröljük az input tartalmát
                        if (value < 1 || value > 9 || isNaN(value)) {
                            inputElement.value = '';
                        } else {
                            // Ellenőrizzük a cellát a beírt értékkel
                            checkCell(row, col, parseInt(value));
                        }
                    });
                    // Hozzáadjuk az input elemet a cella elemhez
                    cellElement.appendChild(inputElement);
                }
                // Hozzáadjuk a cella elemet a tábla elemhez
                boardElement.appendChild(cellElement);
            }
        }
    }

    // Az adott cella ellenőrzése a Sudoku szabályai szerint.
    function checkCell(row, col, num) {
        // Lekérjük az adott cellát a cells tömbből.
        const cellElement = cells[row * 9 + col];
        // Ellenőrizzük, hogy a cella fix-e.
        const isFixed = cellElement.classList.contains('fixed');
        // Ellenőrizzük, hogy az adott szám érvényes-e az adott cellában.
        const isValid = isValidMove(randomBoard, row, col, num);
        // Eltávolítjuk a 'correct' és 'incorrect' osztályokat a cellából.
        cellElement.classList.remove('correct', 'incorrect');
        // Ha a cella nem fix, hozzáadjuk a megfelelő osztályt az érvényesség szerint.
        if (!isFixed) {
            cellElement.classList.add(isValid ? 'correct' : 'incorrect');
        }
    }

    // Teljes tábla ellenőrzése
    function checkBoard(board) {
        // Kezdetben feltételezzük, hogy az egész tábla helyesen van kitöltve.
        let isComplete = true;
    
        // Végigmegyünk minden soron.
        for (let row = 0; row < 9; row++) {
            // Végigmegyünk minden oszlopon.
            for (let col = 0; col < 9; col++) {
                // Lekérjük az aktuális cella DOM elemét a cellák tömbből.
                const cellElement = cells[row * 9 + col];
    
                // Ellenőrizzük, hogy a cella 'fixed' osztállyal rendelkezik-e (azaz előre kitöltött szám).
                if (!cellElement.classList.contains('fixed')) {
                    // Lekérjük a cellában lévő input elemet.
                    const inputElement = cellElement.querySelector('input');
                    // Az input értékét számmá alakítjuk.
                    const value = parseInt(inputElement.value);
                    // Ellenőrizzük, hogy a beírt szám érvényes-e a jelenlegi pozícióban.
                    const isValid = isValidMove(board, row, col, value);
    
                    // Eltávolítjuk a 'correct' és 'incorrect' osztályokat a cellából, hogy újra beállíthassuk.
                    cellElement.classList.remove('correct', 'incorrect');
    
                    // Ha van érték az inputban és az érvényes, hozzáadjuk a 'correct' osztályt.
                    if (value && isValid) {
                        cellElement.classList.add('correct');
                    } else {
                        // Ha nincs érték vagy az érvénytelen, hozzáadjuk az 'incorrect' osztályt és beállítjuk, hogy a tábla nincs teljesen kitöltve.
                        cellElement.classList.add('incorrect');
                        isComplete = false;
                    }
                }
            }
        }
    
        // Ha a tábla teljesen és helyesen van kitöltve, megjelenítjük az üzenetet.
        if (isComplete) {
            messageElement.textContent = 'Gratulálunk, minden szám helyes!';
        } else {
            // Ha nem teljesen helyes, akkor az üzenet üres marad.
            messageElement.textContent = '';
        }
    }
    
// Érvényes lépés ellenőrzése a Sudoku szabályai szerint
function isValidMove(board, row, col, num) {
    // Végigmegyünk az aktuális soron és oszlopon.
    for (let x = 0; x < 9; x++) {
        // Ellenőrizzük, hogy a 'num' már benne van-e az aktuális sorban vagy oszlopban.
        if (board[row][x] === num || board[x][col] === num) {
            // Ha igen, akkor az aktuális lépés nem érvényes, így visszatérünk hamissal.
            return false;
        }
    }

    // Meghatározzuk a 3x3-as blokk kezdő sorát és oszlopát.
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    // Végigmegyünk a 3x3-as blokkon.
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            // Ellenőrizzük, hogy a 'num' benne van-e a 3x3-as blokkban.
            if (board[startRow + i][startCol + j] === num) {
                // Ha igen, akkor az aktuális lépés nem érvényes, így visszatérünk hamissal.
                return false;
            }
        }
    }

    // Ha sem a sorban, sem az oszlopban, sem a 3x3-as blokkban nincs ütközés, akkor az aktuális lépés érvényes.
    return true;
}

// Véletlenszerű tábla generálása
function generateRandomBoard() {
    // Létrehozunk egy 9x9-es táblát, ahol minden cella null értéket kap kezdetben.
    const board = Array.from({ length: 9 }, () => Array(9).fill(null));

    // Függvény a tábla kitöltésére
    function fillBoard() {
        // Végigmegyünk minden soron.
        for (let i = 0; i < 9; i++) {
            // Végigmegyünk minden oszlopon.
            for (let j = 0; j < 9; j++) {
                // Ha a cella null értékű (azaz üres).
                if (board[i][j] === null) {
                    // Létrehozunk egy listát az 1-9 számokról és véletlenszerűen megkeverjük.
                    const numbers = shuffleArray([...Array(9).keys()].map(x => x + 1));
                    // Végigmegyünk a véletlenszerűen megkevert számokon.
                    for (let number of numbers) {
                        // Ellenőrizzük, hogy az aktuális szám érvényes lépés-e az adott pozícióban.
                        if (isValidMove(board, i, j, number)) {
                            // Ha érvényes, beírjuk a számot a cellába.
                            board[i][j] = number;
                            // Ellenőrizzük, hogy a tábla teljesen ki van-e töltve, vagy a rekurzív hívás sikeres-e.
                            if (isBoardFull(board) || fillBoard()) {
                                return true;
                            }
                            // Ha nem sikerül, visszaállítjuk a cellát null értékre.
                            board[i][j] = null;
                        }
                    }
                    // Ha egyik szám sem volt érvényes, visszatérünk hamissal.
                    return false;
                }
            }
        }
        // Ha minden cella sikeresen kitöltve, visszatérünk igazzal.
        return true;
    }

    // Ellenőrizzük, hogy a tábla teljesen ki van-e töltve.
    function isBoardFull(board) {
        return board.every(row => row.every(cell => cell !== null));
    }

    // Függvény egy tömb véletlenszerű megkeverésére.
    function shuffleArray(array) {
        // Végigmegyünk a tömb elemein fordított sorrendben.
        for (let i = array.length - 1; i > 0; i--) {
            // Véletlenszerű indexet generálunk a jelenlegi pozícióig.
            const j = Math.floor(Math.random() * (i + 1));
            // Felcseréljük a jelenlegi elemet és a véletlenszerűen kiválasztott elemet.
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Meghívjuk a tábla kitöltéséért felelős függvényt.
    fillBoard();

    // Véletlenszerűen kiválasztunk 40 cellát és null értéket adunk nekik, hogy üres cellákat hozzunk létre.
    for (let i = 0; i < 40; i++) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        board[row][col] = null;
    }

    // Visszatérünk a generált táblával.
    return board;
}


    // Létrehozunk egy véletlenszerű táblát
    const randomBoard = generateRandomBoard();
    // Létrehozzuk a táblát a DOM-ban
    createBoard(randomBoard);

    // Hozzáadjuk az eseménykezelőt a "Check" gombhoz, amely ellenőrzi a tábla állapotát
    document.getElementById('check-button').addEventListener('click', () => checkBoard(randomBoard));
});