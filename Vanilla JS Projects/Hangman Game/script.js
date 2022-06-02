const word_section = document.querySelector('#word-section')
const letterHistory = document.querySelector('#letter-history')
const resultDisplay = document.querySelector('#result-display')
const tip = document.querySelector('#get-tip')
const newWord = document.querySelector('#new-word')
let wordChars = [];
let guessedChars = []
let remainingLetters;
let wrongLetters=0;

const canvas = document.querySelector('#canvas1')
    if (canvas.getContext("2d")) { // Check HTML5 canvas support
        context = canvas.getContext("2d");
    }

function countLetters(word){
    let counter=0;
    for(i=0; i<word.length; i++){
        counter++;
    }
    return counter;
}

function breakWord(word){
    for(i=0; i<word.length; i++){
        wordChars[i] = word[i];
    }
}

function getWord(noOfLetters){
    for(i=0; i<noOfLetters; i++){
        const newSpan = document.createElement('span');
        newSpan.classList.add('letter');
        newSpan.id = `letter${i}`;
        if(i===0){
            newSpan.textContent = wordChars[0]
        }else{
            newSpan.textContent = '_'
        }
        word_section.append(newSpan);
    }
}

function drawHangman(mistakes){
    const canvas = document.querySelector('#canvas1')
    if (canvas.getContext("2d")) { // Check HTML5 canvas support
        context = canvas.getContext("2d");
    }
    switch(mistakes){
        case 1 :
            //draw gallow
            context.lineWidth = 6;
            context.beginPath();
            context.strokeStyle = 'white';
            context.moveTo(100,0);
            context.lineTo(100,450);
            context.stroke();
            context.beginPath();
            context.moveTo(100,0);
            context.lineTo(200,0);
            context.moveTo(200,0);
            context.lineTo(200,20);
            context.stroke();
            break;
        case 2 :
            //draw head
            context.beginPath();
            context.fillStyle = "white";
            context.beginPath();
            context.arc(200, 50, 30, 0, Math.PI * 2, true);
            context.stroke();
            break;
        case 3 :
             //draw body
            context.beginPath();
            context.moveTo(200, 80);
            context.lineTo(200, 180);
            context.strokeStyle = 'white'
            context.stroke();
            break;
        case 4:
            //draw left arm
            context.beginPath();
            context.strokeStyle = "white"; 
            context.moveTo(200, 80);
            context.lineTo(150, 130);
            context.stroke();
            break;
        case 5:
            //draw right arm
            context.beginPath();
            context.moveTo(200, 80);
            context.lineTo(250, 130);
            context.stroke();
            break;
        case 6:
            //draw left leg
            context.beginPath();
            context.strokeStyle = "white";
            context.moveTo(200, 180);
            context.lineTo(150, 280);
            context.stroke();
            break;
        case 7:
            //draw right arm
            context.beginPath();
            context.moveTo(200, 180);
            context.lineTo(250, 280);
            context.stroke();
            break;
    }

}

newWord.addEventListener('click', () =>{
    window.location.reload();
})


document.addEventListener('keydown', (e) => {
    let found = false;
    for(i=0; i<guessedChars.length; i++){
        if(e.key === guessedChars[i]){
            alert('PLEASE GUESS ANOTHER LETTER!')
            wrongLetters--;
        }/* else if(e.key !== guessedChars[i]){
            letterHistory.textContent += `${e.key},     ` 
        } */
    }
    guessedChars.push(e.key)   
    for(i=1; i<wordChars.length; i++){
        if(e.key.toLowerCase() === wordChars[i]){
            const span  = document.querySelector(`#letter${i}`)
            span.textContent = wordChars[i]
            remainingLetters--;
            found = true;
        }
    }
    if(found === false){
        wrongLetters++;
    }
    drawHangman(wrongLetters);        
    if(remainingLetters === 0 || wrongLetters === 7){
        setTimeout(() =>{
            alert('GAME OVER!');
        },500)
    }
})

tip.addEventListener('click', () => {
    let spans = document.querySelectorAll('span')
    let emptyLetters = [];
    let counter = 0;
    for(let span of spans){
        if(span.textContent  === '_'){
            emptyLetters.push(span);
            counter++;
        }
    }
    let rand = Math.floor(Math.random() * counter)
    let randomLetterId = emptyLetters[rand].id;
    const randomLetter = document.querySelector(`#${randomLetterId}`);
    let stringify = randomLetterId.toString();
    let position = stringify.slice(-1);
    randomLetter.textContent = wordChars[position]
    remainingLetters--;
    if(remainingLetters===0){
        setTimeout(() =>{
            alert('GAME OVER!');
        },500)
    }
})

fetch('https://random-word-api.herokuapp.com/word')
.then(response => {
    return response.json();
})
.then(data => {
    let word = data[0];
    breakWord(word)
    getWord(countLetters(word))
    console.log(wordChars)
    remainingLetters = countLetters(word) - 1;
})




