function delete_city(element) {
	element.parentNode.parentNode.parentNode.remove();
}

function add_city(city_name) {
	let xhr = new XMLHttpRequest();
	city_name = city_name.toLowerCase();
	city_name = city_name.charAt(0).toUpperCase() + city_name.slice(1);
	console.log(city_name);
	xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=34f71b8b89066cd53a354da222c6de0c&units=metric`);
	xhr.send();
	xhr.onload = function() {
		if (xhr.status != 200) { 
			alert(`Ошибка, ${city_name} не найден!`);
		} else {
			data = JSON.parse(xhr.response);
			// create list item
			new_city = document.createElement("li");
			new_city.classList.add("another_city");
			// creating div for header
			header = document.createElement("div");
			header.classList.add("another_city_header");
			// creating div for city name
			another_city_name = document.createElement("div");
			another_city_name.classList.add("another_city_name");
			another_city_name.innerHTML = `<h3>${city_name}</h3>`;
			header.appendChild(another_city_name);
			// create div for temperature
			another_city_temp = document.createElement("div");
			another_city_temp.classList.add("another_city_temperature");
			another_city_temp.innerHTML = `<span>${data.main.temp}°C</span>`;
			header.appendChild(another_city_temp);
			// create div for image
			another_city_image = document.createElement("div");
			another_city_image.classList.add("another_city_weather_image");
			another_city_image.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" width=50 height=50></img>`;
			header.appendChild(another_city_image);
			// create div for close button
			another_city_button = document.createElement("div");
			another_city_button.classList.add("another_city_close_button");
			another_city_button.innerHTML = `<button class="close_button" onclick="delete_city(this)">X</button>`;
			header.appendChild(another_city_button);
			// adding header to li
			new_city.appendChild(header);
			// create ul for properties
			another_city_prop = document.createElement("ul");
			another_city_prop.classList.add("another_city_properties");
			another_city_prop.innerHTML = `<li><span class="property">Ветер</span>${data.wind.speed} m/s</li>
<li><span class="property">Облачность</span>${data.weather[0].description}</li>
<li><span class="property">Давление</span>${data.main.pressure} hpa</li>
<li><span class="property">Влажность</span>${data.main.humidity} %</li>
<li><span class="property">Координаты</span>[${data.coord.lon}, ${data.coord.lat}]</li>`;
			new_city.appendChild(another_city_prop);
			// appending child
			document.getElementsByClassName("another_cities")[0].appendChild(new_city);
			if (window.localStorage.getItem(city_name) === null) {
				window.localStorage.setItem(city_name, "");
			}
		}
	}
	
}

function main() {
	var input = document.getElementById("input_city");

	input.addEventListener("keyup", function(event) {
		if (event.keyCode === 13) {
			event.preventDefault();
			document.getElementById("add_city_button").click();
		}
	});
	
	for (key in Object.keys(window.localStorage)) {
		add_city(Object.keys(window.localStorage)[key]);
	}
}	