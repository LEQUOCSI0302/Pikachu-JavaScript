let firstClick = null;
let gameOver = false;
const score = document.getElementById('score');
let scoreC = 0;
let soLuongPokemonConLai = (row * column);
let playAgain = document.getElementsByClassName('play-again');
let scoreAchieve = document.getElementById('score-achieve');
let hienThiWin = document.getElementsByClassName('an-class')[0];
let hienThiOClick = false;
function killPokemon(click){
    let check = board[click.row][click.column];
    if(check === 0){
        return;
    }
    if(gameOver){
        return;
    }
    if(hienThiOClick){
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
                toMau2OClick(firstClick, click);
            }
        }
    }
}

function removePokemon(click1, click2){


    let td1 = getCell(click1.row, click1.column);
    let td2 = getCell(click2.row, click2.column);
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
    if(!daTinhGio){
    daTinhGio = true;
    batDauThoiGian();
}
}

function toMau2OClick(click1, click2){
    hienThiOClick = true;
    let tdA = getCell(click1.row, click1.column);
    let tdB = getCell(click2.row, click2.column);
    tdA.classList.add('matched');
    tdB.classList.add('matched');

    let dsTdDuongDi = [];
    let dsGoc = timCacDiemGoc(click1,click2);
    if(dsGoc){
        for(let i = 0; i<dsGoc.length -1;i++){
            lietkeO(dsGoc[i],dsGoc[i+1]).forEach(function(p){
                if(p.row >= 1 && p.row <= row &&  p.column >= 1 &&  p.column <= column){
                    let td = getCell(p.row, p.column);
                    td.classList.add('duong-di');
                    dsTdDuongDi.push(td);
                }});
            
        
        }
    }
    setTimeout(function(){
        tdA.classList.remove('matched');
        tdB.classList.remove('matched');
    removePokemon(click1,click2);
    hienThiOClick = false;
    dsTdDuongDi.forEach(function(td){ td.classList.remove('duong-di'); }); 
    },480);
}


function rewardScore(scr){
    score.innerHTML = `Điểm số của bạn: ${scr}`
}

function checkWin(){
    if(soLuongPokemonConLai === 0){
        
    hienThiWin.classList.remove('an-class')
       scoreAchieve.innerHTML = `Điểm chiến thắng của bạn là: ${scoreC}`
       clearInterval(timeId);
       gameOver = true;
    }else{
        if(!checkNuocDi()){
            randomBoard();
        }
    }
}

function checkNuocDi(){
    nhomtheoId = {};
    for(let i = 1; i <= row; i++){
        for(let j = 1; j <= column; j++){
            let id = board[i][j];
            if(id !== 0){
                if(!nhomtheoId[id]){
                    nhomtheoId[id] = [];
                }
                nhomtheoId[id].push({row: i, column: j});
            }
        }
    }
    for(id in nhomtheoId){
        let ds = nhomtheoId[id];
        for(let i = 0; i < ds.length; i++ ){
            for(let j = i+1; j < ds.length; j++){
                if(checkPath(ds[i], ds[j]) || checkPathforL(ds[i],ds[j]) || checkPathforUandZ(ds[i],ds[j])){
                    return true;
                }
            }
        }
    }
    return false;
}

function randomBoard(){
    dsToaDo = [];
    dsId = [];
    for(let i = 1; i <= row; i++){
        for(let j = 1; j <= column; j++){
            let id = board[i][j];
            if(id !== 0){
               dsId.push(id)
                dsToaDo.push({row: i, column: j});
            }
        }
    }
    let dsDoiViTri = randomImage(dsId);
    for(let i = 0; i < dsToaDo.length; i++){
        board[dsToaDo[i].row][dsToaDo[i].column] = dsDoiViTri[i];
    }
    renderBoard();
}

function resetBoard(){
    initBoard();
    firstClick = null;
    scoreC = 0;
    rewardScore(scoreC);
    soLuongPokemonConLai = row * column;
    renderBoard()
   for(let i = 0; i < row; i++){
    for(let j = 0; j < column; j++){
       pikachuBoard.rows[i].cells[j].classList.remove('selected');
    }
   }
    hienThiWin.classList.add('an-class')
   
    daTinhGio = false;
    clearInterval(timeId);
    thoiGianConLai = tongThoiGian;
    updateThoiGian();
    hienThiLoss.classList.add('an-class-time');
    gameOver = false;
}

for(let i = 0; i < playAgain.length; i++){
    playAgain[i].addEventListener('click',resetBoard )
}
function timGocL(click1, click2){
    let cacGoc = [{row: click1.row, column: click2.column}, {row: click2.row, column: click1.column}];
    for(let i = 0; i < 2; i++){
        let g = cacGoc[i];
        if(board[g.row][g.column] && checkPath(click1,g)  &&  checkPath(g,click2)){
            return g;
        }
    }
    return null;
}

function timCacDiemGoc(click1, click2){
    if(checkPath(click1,click2)) return [click1,click2];
    let g = timGocL(click1,click2);
    if(g) return [click1,g,click2];
    for(let i = 0 ; i< board.length; i++){
        let p = {row: i, column: click2.column};
        if(board[p.row][p.column] !== 0 && !checkPath(p,click2)) continue;
        if(checkPath(click1, p)) return [click1, p, click2];
        if(checkPathforL(click1, p)){
            let goc =  timGocL(click1, p);
            if(goc) return [click1,goc,p,click2];
        }
    }
     for(let i = 0 ; i< board[0].length; i++){
        let p = {row: click2.row, column:i };
        if(board[p.row][p.column] !== 0 && !checkPath(p,click2)) continue;
        if(checkPath(click1, p)) return [click1, p, click2];
        if(checkPathforL(click1, p)){
            let goc =  timGocL(click1, p);
            if(goc) return [click1,goc,p,click2];
        }
    }
    return null;
}

function lietkeO(click1, click2){
    let ds = [{row: click1.row,column: click1.column}];
    let dr = Math.sign(click2.row - click1.row);
    let dc = Math.sign(click2.column - click1.column);
    let r =click1.row;
    let c = click1.column;
    while(r !== click2.row ||  c !== click2.column){
        r += dr;
        c += dc;
        ds.push({row: r, column: c});
    }
    return ds;
}
function checkPath(click1, click2){
    let kiemtraPhanTu = true;
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
            for(let i = click1.column -1; i > click2.column; i--){
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

            for(let i = click1.row+1; i < click2.row; i++){
                if(board[i][click1.column]){
                    kiemtraPhanTu =  false;
                 }
            }
        }else{
            if(click1.row-1 === click2.row){
            return true;
            }
             for(let i = click1.row-1; i > click2.row; i--){
                    if(board[i][click1.column]){
                        kiemtraPhanTu =  false;
                    }
            }
            
        }
    }
    
    return kiemtraPhanTu;
}
function checkPathforL(click1, click2){
    let kiemtraPhanTuBenA = true;
    let kiemtraPhanTuBenB = true;
    if(click1.row < click2.row){
        for(let i = click1.row; i < click2.row;i++){
            if(board[i][click2.column]){
                kiemtraPhanTuBenA = false;
            }
            if(board[i+1][click1.column]){
                kiemtraPhanTuBenB = false;
            }
        }
    }else{
        for(let i = click1.row; i > click2.row;i--){
            if(board[i][click2.column]){
                kiemtraPhanTuBenA = false;
            }
            if(board[i-1][click1.column]){
                kiemtraPhanTuBenB = false;
            }
        }
    }
    
    if(click1.column < click2.column){
        for(let i = click1.column; i < click2.column;i++){
            if(board[click2.row][i] ){
                kiemtraPhanTuBenB = false;
               
            }
            if(board[click1.row][i+1]){
                 kiemtraPhanTuBenA = false;
            }
        }
    }else{
        for(let i = click1.column; i > click2.column;i--){
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
    let kiemtraPhanTu = false;
    for(let i = 0; i < board.length; i++){
        let p = {row: i, column: click2.column};
        if(board[p.row][p.column] === 0 && (checkPathforL(click1,p) || checkPath(click1, p)) && checkPath(p,click2)){
            kiemtraPhanTu  =  true;
        }
    }
    for(let j = 0; j < board[0].length;j++){
         let p = {row: click2.row, column: j};
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
    let td = event.target.closest('td');

    if(td === null){
        return;
    }
    let rowtd = td.parentElement.rowIndex+1;
    let columntd = td.cellIndex+1;
    killPokemon({row: rowtd, column: columntd});
}
pikachuBoard.addEventListener('click', clickPokemon)
