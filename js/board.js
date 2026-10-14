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
    for (let i = 0; i < row+2; i++){
        let tr = document.createElement("tr");
        for (let j = 0; j < column+2; j++){
            let td = document.createElement("td");
            td.classList.add('cell');
            if(i === 0 || i === row+1 || j === 0 ||  j === column +1){
                td.classList.add('vien');
            }
            tr.appendChild(td);
        }
        pikachuBoard.appendChild(tr);
    }
}
createBoard();

function initBoard(){
     board = [];
   let cell =column * row;
   let image = []
   for (let i= 0; i< cell/2; i++){
        const imageId = i % containImage.length;
        image.push(imageId+1);
        image.push(imageId+1);
   }
   var randomImages = randomImage(image);
       
   for(let i = 0; i < row+2; i++){
            let arr = [];
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
    for(let i = 0; i<row+2;i++){
        for(let j = 0; j<column+2;j++){
            const cell = pikachuBoard.rows[i].cells[j];
            cell.innerHTML = '';
                if(board[i][j] !== 0){
                    const img = document.createElement('img');
                    img.src = `./assets/pikachu_img/type${board[i][j]}.png`;
                    cell.innerHTML = '';
                    cell.appendChild(img);
                    cell.classList.remove('an');
                    cell.classList.add('style');

                }else{
                    cell.classList.remove('style');
                    cell.classList.add('an');
                }
            }
        }
}
renderBoard();