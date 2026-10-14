let swap = document.getElementById('swap');
swap.addEventListener('click',randomBoard);
let tongThoiGian = 1800;
let thoiGianConLai = tongThoiGian;
let timeId= null;
let timeFill = document.getElementById('time-fill');
let timecurrent = document.getElementById('set-time');
let daTinhGio = false;
let hienThiLoss = document.getElementsByClassName('an-class-time')[0];
let scoreAchieveLoss = document.getElementById('score-achieve-loss');
let buttongoiY = document.getElementById('suggest');
let capGoiY = null;

let tiengClick = new Audio("assets/sound/comedy_pop_finger_in_mouth_001.mp3");
let tiengCorrect = new Audio("assets/sound/duolingo-correct.mp3");
let tiengError = new Audio("assets/sound/error_CDOxCYm.mp3");
let tiengCongratulations =  new Audio("assets/sound/mus-youwin.mp3");
let tiengLoss = new Audio("assets/sound/losssss.mp3");
tiengClick.load();
tiengCorrect.load();
tiengError.load();
tiengCongratulations.load();
tiengLoss.load();
function batDauThoiGian(){
    clearInterval(timeId);
    thoiGianConLai = tongThoiGian;
    updateThoiGian();
    timeId = setInterval( function(){
        thoiGianConLai--;
        updateThoiGian();
        if(thoiGianConLai ===0){
            clearInterval(timeId);
            hetGio();
        }

    },1000);
}
function updateThoiGian(){
     timeFill.style.height = (thoiGianConLai / tongThoiGian *100) + '%';
     let phut = Math.floor(thoiGianConLai/60)
     let giay = thoiGianConLai % 60;
     timecurrent.innerHTML = phut + ':' + (giay <10 ?'0' :'')+ giay;
}
function hetGio(){
    hienThiLoss.classList.remove('an-class-time')
    phat(tiengLoss);
       scoreAchieveLoss.innerHTML = `Điểm khi thua của bạn là: ${scoreC}`
       clearInterval(timeId);
       gameOver = true;
}

function timCapGoiY(){
    let nhom = {};
    for(let i = 1; i<= row; i++){
        for(let j = 1; j <= column; j++){
            let id = board[i][j];
            if(id !== 0){
                if(!nhom[id]) nhom[id] = [];
                 nhom[id].push({row:i, column:j});
            }
           
        }
    }
    for(let id in nhom){
        let ds = nhom[id];
        for(let i = 0; i< ds.length; i++){
            for(let j = i+1; j< ds.length; j++){
                if(checkPath(ds[i],ds[j]) || checkPathforL(ds[i],ds[j]) || checkPathforUandZ(ds[i],ds[j])){
                    return [ds[i],ds[j]];
                }
            }
        }
    }
    return null;
}

function xoaBoGoiY(){
    if(capGoiY){
        getCell(capGoiY[0].row, capGoiY[0].column).classList.remove('suggest');
        getCell(capGoiY[1].row, capGoiY[1].column).classList.remove('suggest');
        capGoiY = null;
    }
}
function goiY(){
        let cap = timCapGoiY();
        if(!cap) return;
        capGoiY = cap;
        getCell(capGoiY[0].row, capGoiY[0].column).classList.add('suggest');
        getCell(capGoiY[1].row, capGoiY[1].column).classList.add('suggest');
}
buttongoiY.addEventListener('click',goiY)

function phat(tieng){
    tieng.currentTime = 0;
    tieng.play();
}
document.querySelectorAll('button').forEach(function(nut){
    nut.addEventListener('click',function(){
        phat(tiengClick);
    });
});