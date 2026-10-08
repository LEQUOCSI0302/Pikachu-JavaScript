let firstClick = null;

function killPokemon(click){
    var check = board[click.row][click.column];
    if(check === 0){
        return;
    }

    if(firstClick === null){
        firstClick = click;
        getCell(firstClick.row, firstClick.column).classList.add('selected');
        return;
    }else{
        if(firstClick.row === click.row && firstClick.column === click.column){
            getCell(firstClick.row, firstClick.column).classList.remove('selected');
            firstClick = null;
            return;
        }else if(board[firstClick.row][firstClick.column] !== board[click.row][click.column]){
            getCell(firstClick.row, firstClick.column).classList.remove('selected');
             firstClick = click;
             getCell(firstClick.row, firstClick.column).classList.add('selected');
            return;
        }else{
            removePokemon(firstClick, click);
        }
    }
}

function removePokemon(click1, click2){


    var td1 = getCell(click1.row, click1.column);
    var td2 = getCell(click2.row, click2.column);
    td1.classList.remove('selected');
    td2.classList.remove('selected');
    board[click1.row][click1.column] = 0;
    board[click2.row][click2.column] = 0;
    td1.innerHTML = '';
    td2.innerHTML = '';
    firstClick = null;



}

function getCell(row, column){
    return pikachuBoard.rows[row].cells[column];
}
function clickPokemon(event){
    var td = event.target.closest('td');

    if(td === null){
        return;
    }
    var rowtd = td.parentElement.rowIndex;
    var columntd = td.cellIndex;
    killPokemon({row: rowtd, column: columntd});
}
pikachuBoard.addEventListener('click', clickPokemon)
