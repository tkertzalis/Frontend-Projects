const getMeal = document.querySelector('#get_meal')
const mealContainer = document.querySelector('#meal_container')
let randomMeall = {};
const mealImg = document.querySelector('img');
let ingredients = [];
let measurements = [];
const ul = document.querySelector('#ingredients')

getMeal.addEventListener('click', ()=>{
    document.body.style.minHeight = 0;
    mealContainer.style.display = 'flex'

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(res => {
            return res.json();
        })
        .then(data => {
            randomMeall = data.meals[0]
            loadMealInfo();
        })

    })

    function getIngredients(){
        let ingredients = [];
        for(i=1; i<21; i++){
            if(randomMeall[`strIngredient${i}`] !==""){
                ingredients.push(randomMeall[`strIngredient${i}`]);
            }
            else{
                break;
            }
        }
        return ingredients;
    }
    
    function getMeasurments(){
        let measurements = [];
        for(i=1; i<21; i++){
            if(randomMeall[`strMeasure${i}`] !==""){
                measurements.push(randomMeall[`strMeasure${i}`]);
            }
            else{
                break;
            }
        }
        return measurements;
    } 
    

function loadMealInfo() {
    const mealTitle = document.querySelector('#mealTitle')
    mealTitle.textContent = randomMeall.strMeal;

    mealImg.src = randomMeall.strMealThumb;

    const categoryArea = document.querySelector('#area_category');
    categoryArea.textContent = `Area: ${randomMeall.strArea} / Category: ${randomMeall.strCategory}`;

    ingredients = getIngredients();
    measurements  = getMeasurments();
    clearUl();

    for(i=0; i<ingredients.length; i++){
        const newLi = document.createElement('li');
        newLi.textContent = `${ingredients[i]} - ${measurements[i]}`;
        ul.append(newLi);
    }

    const instructions = document.querySelector('#instructions')
    instructions.textContent = randomMeall.strInstructions
}

function clearUl(){
    if (ul) {
        while (ul.firstChild) {
          ul.removeChild(ul.firstChild);
        }
      }
}
