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
       scoreAchieveLoss.innerHTML = `Điểm khi thua của bạn là: ${scoreC}`
       clearInterval(timeId);
       gameOver = true;
}