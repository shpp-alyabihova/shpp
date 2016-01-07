function addBoard() {
    var board = document.createElement('div');
    board.className = 'chessboard';
    document.body.appendChild(board);
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            var cell = document.createElement('div');
            if ((i + j) % 2 == 0) {
                cell.className = 'black-cell';
            }
            else {
                cell.className = 'white-cell';
            }
            board.appendChild(cell);
        }
    }
}
