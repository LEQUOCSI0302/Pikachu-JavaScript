const row = 9
const column = 9
let board = []
let containImage = []
const pikachuBoard = document.getElementById("pikachu-board")
let soLuongAnh = 36

/*
*   Hàm này sẽ load tất cả ảnh vào mảng containImage.
*   @{return} Trả về mảng chứa tất cả ảnh.
*/
function loadImage(){
    for(let i = 1; i<= soLuongAnh; i++){
        const img = new Image();
        img.src = `./assets/pikachu_img/type${i}.png`
        containImage.push(img)
    }
}
loadImage();
/*
*   Hàm này nó sẽ trộn ảnh dựa trên công thức Fisher-Yates Shuffle.
*   Lấy ngẫu nhiên 1 ảnh trong mảng containImage và gán vào 1 ô bất kỳ trong bảng.
*   @{param} containImage: Mảng chứa tất cả ảnh.
*   @{return} Trả về mảng 1 chiều chứa các ảnh đã được trộn ngẫu nhiên.
*/
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
        image.push(containImage[imageId]);
        image.push(containImage[imageId]);
   }
   board = randomImage(image);

   for(let i = 0; i < row; i++){
    var arr = [];
         for(let j = 0; j < column; j++){
            arr.push(board[i * column + j]);
         }
         board[i] = arr;
   }
}
initBoard();

function renderBoard(){
    for(let i = 0; i<row;i++){
        for(let j = 0; j<column;j++){
            const cell = pikachuBoard.rows[i].cells[j];
            const img = board[i][j].cloneNode(true);
            cell.innerHTML = '';
            cell.appendChild(img);
        }
    }
}
renderBoard();