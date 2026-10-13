const cheDoGame = {
    'beginner': {},
    'easy': {},
    'medium': {},
    'hard': {},
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