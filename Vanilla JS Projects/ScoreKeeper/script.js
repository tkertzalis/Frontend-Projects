const playerbtns = document.querySelectorAll('button');
const reset = document.querySelector('#reset');
const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
const dropdown = document.querySelector('#wins');
let value = dropdown.options[dropdown.selectedIndex].value;
let p1Counter = 0;
let p2Counter = 0;

for(let btn of playerbtns){
    btn.addEventListener('click', (e)=>{
        dropdown.disabled = true;
            if(e.target.id=="player1"){
                score1.innerText ++;
                p1Counter ++;
            }else if (e.target.id=="player2"){
                score2.innerText ++;
                p2Counter ++;
            }
            if(p1Counter == value || p2Counter == value){
                document.querySelector('#player1').disabled = true;
                document.querySelector('#player2').disabled = true;
                if(p1Counter == value){
                    score1.classList.add('has-text-success');
                    score2.classList.add('has-text-danger');
                }else{
                    score2.classList.add('has-text-success');
                    score1.classList.add('has-text-danger');
                }
            }    
    })
}

reset.addEventListener('click',(e)=>{
    p1Counter = 0;
    p2Counter = 0;
    score1.innerText = "0";
    score2.innerText = "0";
    document.querySelector('#player1').disabled = false;
    document.querySelector('#player2').disabled = false;
    dropdown.disabled = false;
    score1.classList.remove('has-text-danger','has-text-success');
    score2.classList.remove('has-text-danger','has-text-success');

})

dropdown.addEventListener('change',(e)=>{
    value = dropdown.options[dropdown.selectedIndex].value;
})

