const row = 9
const column= 16
let board = []
let containImage = []
const pikachuBoard = document.getElementById("pikachu-board")
let soLuongAnh = 36


function loadImage(){
    for(let i = 1; i<= soLuongAnh; i++){
        const img = new Image();
        img.src = `./assets/pikachu_img/type${i}.png`
        containImage.push(img)
    }
}
loadImage();

function randomImage(containImage){
    const copyContainImage = [...containImage]
    for(let i = copyContainImage.length - 1; i > 0; i--){
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [copyContainImage[i], copyContainImage[randomIndex]] = [copyContainImage[randomIndex], copyContainImage[i]];
    }
    return copyContainImage;
}

function createBoard(){
    for (let i = 0; i < row; i++){
        var tr = document.createElement("tr");
        for (let j = 0; j < column; j++){
            var td = document.createElement("td");
            td.classList.add('cell');
            tr.appendChild(td);
        }
        pikachuBoard.appendChild(tr);
    }
}
createBoard();

function initBoard(){
     board = [];
   var cell = column * row;
   var image = []
   for (let i= 0; i< cell/2; i++){
        const imageId = i % containImage.length;
        image.push(imageId+1);
        image.push(imageId+1);
   }
   var randomImages = randomImage(image);

   for(let i = 0; i < row; i++){
    var arr = [];
         for(let j = 0; j < column; j++){
            arr.push(randomImages[i * column + j]);
         }
         board[i] = arr;
   }
}
initBoard();

function renderBoard(){
    for(let i = 0; i<row;i++){
        for(let j = 0; j<column;j++){
            const cell = pikachuBoard.rows[i].cells[j];
                const img = document.createElement('img');
                img.src = `./assets/pikachu_img/type${board[i][j]}.png`;
                cell.innerHTML = '';
                cell.appendChild(img);
            }
        }
}
renderBoard();