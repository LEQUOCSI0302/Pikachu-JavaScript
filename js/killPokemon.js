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


}
function checkPath(click1, click2){
    var kiemtraPhanTu = true;
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
     if(kiemtraPhanTu){
        return true;
    }
    
    return false;
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
    if(kiemtraPhanTuBenA || kiemtraPhanTuBenB){
        return true;
    }
    
    return false;
}

function CheckPathContain(){
    var arrImageConLai = [];
    
}
function checkWin(){

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
    if(kiemtraPhanTu){
        return true;
    }
    return false;
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
