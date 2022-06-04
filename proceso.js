let html = "";

document.getElementById("container").style.visibility = "hidden";

const btn = document.getElementById('buscar').addEventListener("click", () => getData());  //evento click para obtener datos

const options = {  //opciones para la peticion
    method: "GET"
};

const getData = () => {  // Funcion para obtener datos
    let pais = document.getElementById('list').value;
    let ciudad = document.getElementById("box").value;
    if(ciudad.length != 0){  //si la ciudad tiene algo se busca por ciudad
        return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=96ddeac7568d65fa1431f5838aa93523`, options) //se hace la peticion

        .then(response => { //se obtiene la respuesta
            if (response.ok) { //si la respuesta es correcta
                document.getElementById("container").style.visibility = "visible";
                return response.json();
            }
        })
            .then(data => { //se obtiene la data
                //convertimos formato json cadena en objeto de javascript
                if(!data){ //si no hay datos
                    document.getElementById("container").style.visibility = "visible";
                    document.getElementById('infoCharacters').innerHTML = `<div class="mt-4"><h2>No se encontró la ciudad</h2></div>`;
                }else{
                    printData(data); //se imprime la data
                }
            }).catch(error => console.log('ERROR ---->', error.message)); //se captura el error
    }
}
const printData = (data) => { //funcion para imprimir la data
    html = ""
    let temp_min = parseInt(data.main.temp_min); //se obtiene la temperatura minima
    let temp_max = parseInt(data.main.temp_max);
    let temp_actual = parseInt(data.main.temp);

    html += `<div class="col-auto mt-4">`
        html += `<div class="card"style="width: 13rem;">`
            html += `<img src="" class="card-img-top" id="icono" alt="...">`
                html += `<div class="card-body">`
                    html += `<h5 class="card-title" id="name"></h5>`
                    html += `<p class="card-text" id="country"></p>`
                    html += `<p class="card-text" id="temp"></p>`
                    html += `<p class="card-text" id="temp_min"></p>`
                    html += `<p class="card-text" id="temp_max"></p>`
                html += `</div>`
        html += `</div>`
    html += `</div>`
    html += `<div id="information" class='mt-4'></div>`

    document.getElementById("infoCharacters").innerHTML = html;

    temp_actual = (temp_actual - 273.15).toFixed(2); //se convierte a grados centigrados
    temp_min = (temp_min - 273.15).toFixed(2);
    temp_max = (temp_max - 273.15).toFixed(2);


    document.getElementById("information").innerHTML = `<h3>Currently the climate of the city is: <u>${data.weather[0].main}</u></h3>`
    document.getElementById("name").innerHTML = data.name;
    document.getElementById("country").innerHTML = `<b>Country: </b> ${data.sys.country}`;
    document.getElementById("temp").innerHTML = `<b>Temp:</b> ${temp_actual} Cº`
    document.getElementById("temp_min").innerHTML = `<b>Temp_min:</b> ${temp_min} Cº`;
    document.getElementById("temp_max").innerHTML = `<b>Temp_max:</b> ${temp_max} Cº`;
    document.getElementById("icono").setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);

}