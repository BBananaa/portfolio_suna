// Background
const bgImages = ["bg01.jpg", "bg02.jpg", "bg03.jpg", "bg05.jpg"];

const chosenImage = bgImages[Math.floor(Math.random() * bgImages.length)];

// const bgImage = document.createElement("img");

// bgImage.src = `bgImages/${chosenImage}`;

// document.body.appendChild(bgImage);
const momentumBg = document.querySelector("#momentum")
momentumBg.style.backgroundImage = `url(./img/project/${chosenImage})`;

// Weather
const API_KEY = "079490b7bf1ed4e3698e6a7b7a44f11f";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json()).then(data => {
        const city = document.querySelector("#weather span:first-child");
        const weather = document.querySelector("#weather sapn:last-child");

        city.innerText = data.name;
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}℃`;
    });
}

function onGeoError() {
    alert("Can't find your location. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk);

// Clock
const momentumClock = document.querySelector('h2#clock');

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    momentumClock.innerText = (`${hours}:${minutes}:${seconds}`);

}

// setInterval(sayHello, 5000);
// setTimeout(sayHello, 5000);

getClock();
setInterval(getClock, 1000);

//Greeting
const loginForm = document.querySelector('#login-form');
const loginInput = document.querySelector('#login-form input');
const greeting = document.querySelector('#greeting');

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

function onLoginSubmit(event) {
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;
    localStorage.setItem(USERNAME_KEY, username);
    paintGreetings(username);
}

function paintGreetings(username) {
    greeting.innerText = `Hello ${username}`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener('submit', onLoginSubmit);
} else {
    paintGreetings(savedUsername);
}

// Todo
const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector("#todo-form input")
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}


function deleteToDo(event) {
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
    saveToDos();
}

function paintToDo(newTodo) {
    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "✖";
    button.addEventListener("click", deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    };
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);



const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null) {
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}


// Quotes
const quotes = [
    {
        quote: "The best way to predict the future is to invent it",
        author: "Alan Kay",
    },
    {
        quote: "I am only one, still I am one. I can not do everything, still I can do something. I will not refuse to do the something I can do.",
        author: "Helen Keller",
    },
    {
        quote: "Only those who will risk going too far can possibly find out how far one can go. ",
        author: "T. S. Eliot",
    },
    {
        quote: "I'm as proud of what we don't do as I am of what we do.",
        author: "Steve Jobs",
    },
    {
        quote: "You have to have confidence in your ability, and then be tough enough to follow through.",
        author: "Rosalynn Carter",
    },
    {
        quote: "Travel expands the mind and fills the gap.",
        author: "Sheda Savage",
    }
    ];
    
    const author = document.querySelector("#quote span:first-child");
    const quote = document.querySelector("#quote span:last-child");
    
    const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    author.innerText = `${todaysQuote.author} : `;
    quote.innerText = todaysQuote.quote;