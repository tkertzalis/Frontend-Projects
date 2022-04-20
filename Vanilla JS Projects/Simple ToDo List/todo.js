const input = document.querySelector('#input');
const addTask = document.querySelector('#addtask');
const list = document.querySelector('#list');
const removeTask = document.querySelector('#removetask');

addTask.addEventListener('click', newTask)

input.addEventListener('keydown', (e) => {
    if(e.code === 'Enter'){
        newTask();
    }
})

removeTask.addEventListener('click', () => { // removes the selected tasks
    const lis = document.querySelectorAll('li');
    for(li of lis){
        if(li.className.includes('crossed')){
            li.remove();
        }
    }
})

document.addEventListener('keydown', (e) => { // shortcut (Ctrl+Q) for selecting all the non-selected tasks
    if(e.ctrlKey && (e.key === 'q' || e.key ==='Q')){
        const checkboxes = document.querySelectorAll('li input');
        for(cb of checkboxes){
            if (!cb.checked){
                cb.checked = true;
                cb.parentElement.classList.add('crossed');
            }
        }
    }
})

function newTask(){ //creates a new task and adds it to the list
    if(input.value !==""){
        const span = document.createElement('span');

        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.className = 'cb';
        cb.classList.add('spacing');

        const li = document.createElement('li');
        li.innerHTML = input.value;
        li.classList.add('has-background-grey-light');
        li.classList.add('mb-3');
        li.classList.add('is-family-monospace');
        li.appendChild(cb);

        span.appendChild(li);
        list.appendChild(span);
        input.value = '';
        cb.addEventListener('change', (e) =>{
        li.classList.toggle('crossed');
        })
    }else alert("Please input a valid task");
}

