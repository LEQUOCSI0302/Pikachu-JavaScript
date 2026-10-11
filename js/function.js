var swap = document.getElementById('swap');
swap.addEventListener('click',randomBoard);
var tongThoiGian = 5;
var thoiGianConLai = tongThoiGian;
var timeId= null;
var timeFill = document.getElementById('time-fill');
var timecurrent = document.getElementById('set-time');
var daTinhGio = false;
var hienThiLoss = document.getElementsByClassName('an-class-time')[0];
var scoreAchieveLoss = document.getElementById('score-achieve-loss');
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
     var phut = Math.floor(thoiGianConLai/60)
     var giay = thoiGianConLai % 60;
     timecurrent.innerHTML = phut + ':' + (giay <10 ?'0' :'')+ giay;
}
function hetGio(){
    hienThiLoss.classList.remove('an-class-time')
       scoreAchieveLoss.innerHTML = `Điểm khi thua của bạn là: ${scoreC}`
       clearInterval(timeId);
       gameOver = true;
}