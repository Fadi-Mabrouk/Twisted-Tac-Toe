document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const resetButton = document.getElementById('reset');
    
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    let moveHistory = [];
    let gameActive = true;
    

    function initializeBoard() {
        board.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }
    

    function handleCellClick(e) {
        const index = parseInt(e.target.getAttribute('data-index'));
        
        if (!gameActive || gameState[index] !== null) return;
        
  
        gameState[index] = currentPlayer;
        moveHistory.push(index);
        e.target.textContent = currentPlayer;
        
   
        if (checkWinner()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
/*
        if (!gameState.includes(null)) {
            status.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
*/

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer}'s turn`;
        
    
        if (moveHistory.length >= 5) {
            const firstMoveIndex = moveHistory[0];
            gameState[firstMoveIndex] = null;
            document.querySelector(`[data-index="${firstMoveIndex}"]`).textContent = '';
            moveHistory.shift(); 
        }
    }
    

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8], [2, 4, 6]];
        
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameState[a] && 
                   gameState[a] === gameState[b] && 
                   gameState[a] === gameState[c];
        });
    }
    

    function resetGame() {
        currentPlayer = 'X';
        gameState = Array(9).fill(null);
        moveHistory = [];
        gameActive = true;
        status.textContent = "Player X's turn";
        initializeBoard();
    }
    
 
    resetButton.addEventListener('click', resetGame);
    

    initializeBoard();
});