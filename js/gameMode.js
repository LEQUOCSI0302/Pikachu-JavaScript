const cheDoGame = {
    'beginner': {},
    'easy': {sauKhiAn: donCotKhiAn},
    'medium': {},
    'hard': {sauKhiAn: donXoanOc},
    'extreme-hard': {},
    'nightmare': {}
}
let cheDoHienTai = 'beginner';

function chonCheDo(ten){
    if(!cheDoGame[ten]) return;
    cheDoHienTai = ten;
    resetBoard();
}
let nutCheDo = document.querySelectorAll('.game-mode button:not(#swap)');
nutCheDo.forEach(function(nut){
    nut.addEventListener('click', function(){
        nutCheDo.forEach(function(n){
            n.classList.remove('active');
        });
        nut.classList.add('active');
        chonCheDo(nut.id);
    });
}

);
document.getElementById('beginner').classList.add('active');

function donCotKhiAn(){
   
    for(let i = 1; i <= row; i++){
         let ds = [];
        for(let j = column; j>=1;j--){
            if(board[i][j] != 0){
                ds.push(board[i][j])
            }
            
        }
        let k = 0;
    for(let j = column;j>=1; j--){
        board[i][j] = (k <ds.length) ? ds[k] : 0;
        k++;    
    }
    
    }        
}
function taoDuongXoanOc(){
    let ds = [];
    let trai  = 1;
    let phai = column;
    let tren = 1;
    let duoi = row;
    while(trai <= phai && tren <= duoi){
        for(let j = trai; j <= phai; j++){
            ds.push({row: tren,column: j});
           
        }
         tren++;
        for(let i = tren; i <= duoi; i++){
            ds.push({row: i, column: phai});
           
        }
         phai--;
          if(tren <= duoi){
            for(let j = phai; j>=trai; j--){
                ds.push({row: duoi, column: j});
               
            }
             duoi--;
        }
        if(trai <= phai){
            for(let i = duoi; i >= tren; i--){
                ds.push({row: i,column: trai})
              
            }
              trai++;
        }
       
    }
    return ds;
}
function donXoanOc(){
    let dsXoanOC = taoDuongXoanOc();
    let dsId = [];
    for (let k = 0; k< dsXoanOC.length; k++){
        let p = dsXoanOC[k];
        if(board[p.row][p.column]!==0){
            dsId.push(board[p.row][p.column]);
        }
    }

    let lech = dsXoanOC.length-dsId.length;
    for(let k = 0; k < dsXoanOC.length; k++){
        let p = dsXoanOC[k];
        board[p.row][p.column] = (k < lech) ? 0: dsId[k-lech];
    }
}