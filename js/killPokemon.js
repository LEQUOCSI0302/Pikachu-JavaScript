let firstClick = null;
const score = document.getElementById('score');
var scoreC = 0;
var soLuongPokemonConLai = (row * column);
var playAgain = document.getElementsByClassName('play-again');
var scoreWin = document.getElementById('score-win');
var hienThiWin = document.getElementsByClassName('an-class')[0];
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
            if(checkPath(firstClick, click) || checkPathforL(firstClick,click) || checkPathforUandZ(firstClick,click)){
                removePokemon(firstClick, click);
            }
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
    scoreC += 5;
    rewardScore(scoreC);
    soLuongPokemonConLai -= 2;
    checkWin();
}

function rewardScore(scr){
    score.innerHTML = `Đểm số của bạn: ${scr}`
}

function checkWin(){
    if(soLuongPokemonConLai === 0){
        hienThiWin.classList.remove('an-class')
       scoreWin.innerHTML = `Điểm chiến thắng của bạn là: ${scoreC}`
       
    }else if(soLuongPokemonConLai !== 0){
        
    }
}


function resetBoard(){
    initBoard();
    firstClick = null;
    scoreC = 0;
    rewardScore(scoreC);
    soLuongPokemonConLai = row * column;
    renderBoard()
   for(var i = 0; i < row; i++){
    for(var j = 0; j < column; j++){
       pikachuBoard.rows[i].cells[j].classList.remove('selected');
    }
   }
    hienThiWin.classList.add('an-class')

    
}

for(var i = 0; i < playAgain.length; i++){
        playAgain[i].addEventListener('click',resetBoard )
}

function checkPath(click1, click2){
    var kiemtraPhanTu = true;
    if((click1.row !== click2.row) && (click1.column !== click2.column)){
        kiemtraPhanTu =  false;
    }
    if(click1.row === click2.row){
        if(click1.column < click2.column){
            if(click1.column+1 === click2.column){
            return true;
            }
            
            for(var i = click1.column+1; i < click2.column; i++){
                if(board[click1.row][i]){
                    kiemtraPhanTu =  false;
                }
            }
            if(kiemtraPhanTu){
                return true;
            }
            
        }else{
            if(click1.column-1 === click2.column){
            return true;
            }
            for(var i = click1.column -1; i > click2.column; i--){
                if(board[click1.row][i]){
                    kiemtraPhanTu = false;
                }
            }
            if(kiemtraPhanTu){
                return true;
            }
            

        }
        
    }else if(click1.column === click2.column){
        if(click1.row < click2.row){
            if(click1.row+1 === click2.row){
            return true;
            }

            for(var i = click1.row+1; i < click2.row; i++){
                if(board[i][click1.column]){
                    kiemtraPhanTu =  false;
                 }
            }
        }else{
            if(click1.row-1 === click2.row){
            return true;
            }
             for(var i = click1.row-1; i > click2.row; i--){
                    if(board[i][click1.column]){
                        kiemtraPhanTu =  false;
                    }
            }
            
        }
    }
    
    return kiemtraPhanTu;
}
function checkPathforL(click1, click2){
    var kiemtraPhanTuBenA = true;
    var kiemtraPhanTuBenB = true;
    if(click1.row < click2.row){
        for(var i = click1.row; i < click2.row;i++){
            if(board[i][click2.column]){
                kiemtraPhanTuBenA = false;
            }
            if(board[i+1][click1.column]){
                kiemtraPhanTuBenB = false;
            }
        }
    }else{
        for(var i = click1.row; i > click2.row;i--){
            if(board[i][click2.column]){
                kiemtraPhanTuBenA = false;
            }
            if(board[i-1][click1.column]){
                kiemtraPhanTuBenB = false;
            }
        }
    }
    
    if(click1.column < click2.column){
        for(var i = click1.column; i < click2.column;i++){
            if(board[click2.row][i] ){
                kiemtraPhanTuBenB = false;
               
            }
            if(board[click1.row][i+1]){
                 kiemtraPhanTuBenA = false;
            }
        }
    }else{
        for(var i = click1.column; i > click2.column;i--){
            if(board[click2.row][i] ){
                 kiemtraPhanTuBenB = false;
                
            }
            if(board[click1.row][i-1]){
               kiemtraPhanTuBenA = false;
            }
        }
    }
    
    return kiemtraPhanTuBenA || kiemtraPhanTuBenB;
}

function checkPathforUandZ(click1, click2){
    var kiemtraPhanTu = false;
    for(var i = 0; i < board.length; i++){
        var p = {row: i, column: click2.column};
        if(board[p.row][p.column] === 0 && (checkPathforL(click1,p) || checkPath(click1, p)) && checkPath(p,click2)){
            kiemtraPhanTu  =  true;
        }
    }
    for(var j = 0; j < board[0].length;j++){
         var p = {row: click2.row, column: j};
        if(board[p.row][p.column] === 0 && (checkPathforL(p,click1) || checkPath(p, click1)) && checkPath(p,click2)){
            kiemtraPhanTu  =  true;
        } 
    }
    return kiemtraPhanTu;
}

function getCell(row, column){
    return pikachuBoard.rows[row-1].cells[column-1];
}
function clickPokemon(event){
    var td = event.target.closest('td');

    if(td === null){
        return;
    }
    var rowtd = td.parentElement.rowIndex+1;
    var columntd = td.cellIndex+1;
    killPokemon({row: rowtd, column: columntd});
}
pikachuBoard.addEventListener('click', clickPokemon)
