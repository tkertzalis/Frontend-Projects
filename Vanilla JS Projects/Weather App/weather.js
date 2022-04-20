let timezone = document.querySelector('.location-timezone');
let tempDescription = document.querySelector('.temperature-description');
let tempDegree = document.querySelector('.temperature-degree');
let icon = document.querySelector('#icon');
const tempSection = document.querySelector('.temperature')
const tempSpan = document.querySelector('.temperature span')

window.addEventListener('load', () => {
    let long;
    let lat;
    let apiKey = '0f465c60ffde3c3bec12a7330bab9a36'
    let iconID;


    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api  = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                timezone.textContent = data.timezone;
                tempDescription.textContent = `${data.current.weather[0].main} / ${data.current.weather[0].description}`;
                tempDegree.textContent = kelvintoFarenheit(data.current.temp);
                iconID = data.current.weather[0].icon;
                icon.src = `http://openweathermap.org/img/w/${iconID}.png`

                tempDegree.addEventListener('click', () => {
                    if(tempSpan.textContent === 'F'){
                        tempSpan.textContent = 'C';
                        tempDegree.textContent = farenheitToCelcius(tempDegree.textContent);
                    }else{
                        tempSpan.textContent = 'F'
                        tempDegree.textContent = CelciusToFarenheit(tempDegree.textContent);
                    }
                });
            })
        });
    }
});


function kelvintoFarenheit(temp){
    return Math.round(1.8*(temp-273) + 32);
}

function farenheitToCelcius(temp){
    return Math.round((temp - 32) * 0.5556);
}

function CelciusToFarenheit(temp){
    return Math.round((temp * 1.8) + 32);
}