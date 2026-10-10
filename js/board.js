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
   var cell =column * row;
   var image = []
   for (let i= 0; i< cell/2; i++){
        const imageId = i % containImage.length;
        image.push(imageId+1);
        image.push(imageId+1);
   }
   var randomImages = randomImage(image);
       
   for(let i = 0; i < row+2; i++){
            var arr = [];
         for(let j = 0; j < column+2; j++){
            arr.push(0);
         }
         board.push(arr);
   }

   for(let i = 0; i< row; i++){
    for(let j = 0; j< column; j++){
        board[i+1][j+1] = randomImages[i * column + j];
    }
   }

}
initBoard();

function renderBoard(){
    for(let i = 0; i<row;i++){
        for(let j = 0; j<column;j++){
            const cell = pikachuBoard.rows[i].cells[j];
                const img = document.createElement('img');
                img.src = `./assets/pikachu_img/type${board[i+1][j+1]}.png`;
                cell.innerHTML = '';
                cell.appendChild(img);
            }
        }
}
renderBoard();