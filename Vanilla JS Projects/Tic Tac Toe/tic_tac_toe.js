let gameOver = false;
let player1 = {
    username: "",
    turn: false,};
let player2 = {
    username: "",
    turn: false,};
const playersDiv = document.querySelector('#players');
const span1 = document.querySelector('#playerspan1');
const span2 = document.querySelector('#playerspan2');
let table = document.createElement('table');
const container = document.querySelector('#container');
let score1 = document.querySelector('#score1');
let score2 = document.querySelector('#score2');
let totalMoves = 0;
let board = [];

function askUserNames(){
    while(player1.username === "" || player2.username === ""){
        if(player1.username ==="" && player2.username ===""){
            player1.username = prompt('Player1 name:');
            player2.username = prompt('Player2 name:');
        }else if(player1.username !=="" && player2.username ===""){
            player2.username = prompt('Player2 name:');
        } 
        else if(player2.username !=="" && player1.username ===""){
            player1.username = prompt('Player1 name:'); 
        } 
    }
    span1.textContent = player1.username;
    span1.style.color = 'red';
    span2.textContent = player2.username;
    span2.style.color = 'yellow';

}

function draw_board(){
    table.id = 'game_table';
    for(i=0; i<3; i++){
        let newRow = document.createElement('tr');
        table.append(newRow);
        for(j=0; j<3; j++){
            let newColumn = document.createElement('td');
            newColumn.classList.add('game_square');
            newColumn.id = `square${i}_${j}`;
            newRow.appendChild(newColumn);
            if(player1.turn == false && player2.turn == false){
                let playsFirst = decideTurn();
                alert(`${playsFirst} plays first`);
            }
            newColumn.addEventListener('click', (e) => {
                const image = document.createElement('img');
                totalMoves++;
                if(player1.turn == true){
                    image.src = 'black-circle-icon.jpg';
                    image.alt = 2;
                    player1.turn = false;
                    player2.turn = true;
                    }
                    else{
                        image.src = 'x_sign.png';
                        image.alt = 1;
                        player2.turn = false;
                        player1.turn = true;
                    }
                newColumn.append(image);
                board = getBoard();
                checkWinner(board);
            })
        } 
    }
    container.append(table);
}

function decideTurn(){
    let rand = Math.floor(Math.random()*2) ;
    let turn  = ''
    if(rand == 0){
        player1.turn = true;
        turn = player1.username;
    }else{
        player2.turn = true;
        turn = player2.username;
    }
    return turn;
}

function getBoard(){
    const images = document.querySelectorAll('td');
    for(i=0; i<images.length; i++){
        if(!images[i].hasChildNodes()){
            images[i] = null
        }
    }
    const board1D = [...images];
    const board2D  = listToMatrix(board1D,3);
    return board2D;
}

function listToMatrix(list, elementsPerSubArray) {
    var matrix = [], i, k;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }

        matrix[k].push(list[i]);
    }
    return matrix;
}

function checkVertically(array){
    for(i=0; i<3; i++){
        reds =0;
        yellows=0;
        previous = null;
        for(j=0; j<3; j++){
            if(array[j][i].hasChildNodes()){
                if(array[j][i].children[0].alt === '1' && (previous === null || previous === '1')){
                    reds = 0;
                    yellows++;
                    previous = '1';
                }else if(array[j][i].children[0].alt === '2' && (previous === null || previous === '2')) {
                    yellows=0;
                    reds++;
                    previous = '2';
                }
            }else{
                reds = 0;
                yellows= 0;
                previous = null;
            } 
        }
        if(yellows === 3 || reds === 3){
            break;
        }
    }
    if(yellows === 3){
        return 'yellow'
    }else if(reds ===3){
        return 'red'
    }else{
        return 'no winner'
    } 
}

function checkHorizontally(array){
    for(i=0; i<3; i++){
        reds =0;
        yellows=0;
        previous = null;
        for(j=0; j<3; j++){
            if(array[i][j].hasChildNodes()){
                if(array[i][j].children[0].alt === '1' && (previous === null || previous === '1')){
                    reds = 0;
                    yellows++;
                    previous = '1';
                }else if(array[i][j].children[0].alt === '2' && (previous === null || previous === '2')) {
                    yellows=0;
                    reds++;
                    previous = '2';
                }
            }else{
                reds = 0;
                yellows= 0;
                previous = null;
            }
        }
        if(yellows === 3 || reds === 3){
            break;
        }
    }
    if(yellows === 3){
        return 'yellow'
    }else if(reds ===3){
        return 'red'
    }else{
        return 'no winner'
    } 
} 

function checkDiagonally(array){
    let temp = [];
    let kitrina = 0;
    let kokkina = 0;

    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(array[i][j].id == "square0_0" || array[i][j].id == "square1_1" | array[i][j].id == "square2_2"){
                temp[i] = array[i][j];
            }
        }
    }
    for(let i=0; i<3; i++){
        
        if(temp[i].hasChildNodes()){
            if(temp[i].children[0].alt === '1'){
                kitrina++;
            }else if(temp[i].children[0].alt === '2'){
                kokkina++;
            }
        }
    }
    if(kitrina === 3)
        return 'yellow';
    else if(kokkina ===3)
        return 'red';
    else
        return 'no winner';  

}

function checkRDiagonally(array){
    let temp = [];
    let y = 0;
    let r = 0;

    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(array[i][j].id == "square0_2" || array[i][j].id == "square1_1" | array[i][j].id == "square2_0"){
                temp[i] = array[i][j];
            }
        }
    }
    for(i=0; i<3; i++){
        
        if(temp[i].hasChildNodes()){
            if(temp[i].children[0].alt === '1'){
                y++;
            }else if(temp[i].children[0].alt ==='2'){
                r++;
            }
        }
    }
    if(y === 3)
        return 'yellow';
    else if(r ===3)
        return 'red';
    else
        return 'no winner';     
}

function emptyBoard(board){
    for(i=0; i<3; i++){
        for(j=0; j<3; j++){
            if(board[i][j].hasChildNodes())
                board[i][j].removeChild(board[i][j].children[0]);
        }
    }
    totalMoves=0;
}

function checkWinner(board){
    let horizontally = checkHorizontally(board);
    let vertically ;
    let diagonally ;
    let rdiagonally;
    if(totalMoves % 9 == 0){
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
        totalMoves=0;
    }
    if(horizontally === 'red'){
        score1.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
            score1.classList.add('blink');
        },2000)
        totalMoves=0;
    }else if(horizontally === 'yellow'){
        score2.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }
    if(horizontally === 'no winner'){
        vertically = checkVertically(board);
    }
    if(vertically === 'red'){
        score1.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }else if(vertically === 'yellow'){
        score2.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }
     if(vertically === 'no winner'){
        diagonally = checkDiagonally(board);
    }
    if(diagonally === 'red'){
        score1.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }else if(diagonally === 'yellow'){
        score2.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
        
    }
     if(diagonally === 'no winner'){
        rdiagonally =  checkRDiagonally(board);
    }
    if(rdiagonally === 'red'){
        score1.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }
    else if(rdiagonally === 'yellow'){
        score2.innerHTML++;
        setTimeout(() =>{
            emptyBoard(board);
        },2000)
    }
}

askUserNames();
draw_board();





