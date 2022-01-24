const menus = [...document.querySelectorAll('#gnb li a')]
const gallery = document.querySelector('#gallery')
const project = document.querySelector('#project')
const about = document.querySelector('#about')
const blog = document.querySelector('#blog')
const sections = [...document.querySelectorAll('section')]

window.addEventListener("load", () => {
  sections[1].style.display = "none"
  sections[2].style.display = "none"
})

for (let i = 0; i < menus.length; i++) {

  menus[i].addEventListener('click', (e) => {
    const active = document.querySelector('.active')
    active.classList.remove('active')
    e.target.parentElement.classList.add('active')
   
    sections.forEach(section => {
      section.style.display = "none"

      switch(e.target.hash) {
        case "#gallery":
          gallery.style.display = "block"
        break
        case "#project":
          project.style.display = "block"
        break
        case "#about":
          about.style.display = "block"
        break
        case "#blog":
          blog.style.display = "block"
        break
      }
    })
  })

}

// Coordinate
const coordinate = document.querySelector('#coordinate')
const horizontal = document.querySelector('.horizontal');
const vertical = document.querySelector('.vertical');
const target = document.querySelector('.target');
const tag = document.querySelector('.tag');

const targetRect = target.getBoundingClientRect();
const targetHalfWidth = targetRect.width / 2;
const targetHalfHeight = targetRect.height / 2;
let top_padding = coordinate.getBoundingClientRect().y.toFixed(0);
let left_padding = coordinate.getBoundingClientRect().x.toFixed(0);

function handler(event) {
    const x = event.clientX - left_padding;
    const y = event.clientY - top_padding;
    horizontal.style.transform = `translateY(${y}px)`;
    vertical.style.transform = `translateX(${x}px)`;
    target.style.transform = `translate(${x}px, ${y}px)`;
    tag.style.transform = `translate(${x}px, ${y}px)`;
    tag.innerHTML = `${x}px, ${y}px`;
}

coordinate.addEventListener('mousemove', handler);
window.addEventListener('scroll', () => {
  top_padding = coordinate.getBoundingClientRect().y.toFixed(0);
  left_padding = coordinate.getBoundingClientRect().x.toFixed(0);
})


//Change Bg
const colorNum = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
const bg = document.querySelector('#changeBg');
const button = document.querySelector('button');

let ColorArr = [];
function genarateColor() {
    
    let bg = `#`;
    for (let i = 1; i < 4; i++) {
        for (let i = 1; i < 7; i++) {
            let bgColors = colorNum[Math.floor(Math.random() * colorNum.length)];
            bg += bgColors
        }
        ColorArr.push(bg)
        bg = `#`
    }
    return ColorArr
}
function changeBg() {
    genarateColor()

    const deg = Math.floor(Math.random() * 360);
    bg.style.background = `linear-gradient(${deg}deg, ${ColorArr[0]}, ${ColorArr[1]}, ${ColorArr[2]})`;

    return ColorArr = []
}
changeBg();
button.addEventListener('click', changeBg);


//Countdown

// getTime -> the number of milliseconds
// Set the date we're counting down to
const clock = document.querySelector('.clock');
let year = new Date().getFullYear();
let xmasDate;
// Update the count down every 1 second
let d_dayInterval = setInterval(d_dayCalculator, 1000);

function d_dayCalculator() {
  xmasDate = new Date(`${year}-12-25:00:00:00`).getTime();
  // Get today's date and time
  const now = new Date().getTime();
  // Find the distance between now and the count down date
  const distance = xmasDate - now;
  
  // Time calculations for days, hours, minutes and seconds
  // x-mas - now = ms
  // milliseconds of 1day = 24hrs * 60mins * 60secs * 1000ms 
  const days = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, "0");
  const hours = String(Math.floor((distance % (1000*60*60*24))/(1000*60*60))).padStart(2, "0");
  const minutes = String(Math.floor((distance % (1000*60*60))/(1000*60))).padStart(2, "0");
  const seconds = String(Math.floor((distance % (1000*60))/1000)).padStart(2, "0");
  
  // Output the result in an element with id="clock"
  clock.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  
  // If the count down is over, write some text 
  if (distance < 0) {
      clearInterval(d_dayInterval);
      clock.innerHTML = "Merry Christmas";
      year += 1
      return setTimeout(() => setInterval(d_dayCalculator, 1000), 86400000)
    }
}
    
// Random Number Game
const generateForm = document.querySelector('#generateNum-form');
const generateInput = document.querySelector('#generateNum-form input');
const guessForm = document.querySelector('#guessNum-form');
const guessInput = document.querySelector('#guessNum');
const playingNum = document.querySelector('.playingNum');
const result = document.querySelector('.result');
const playBtn = document.querySelector('#guessNum-form button')

function generateNum(event) {
    event.preventDefault();
    const maxValue = Number(generateInput.value);

    if( maxValue < 0 ) {
        alert('Please write a positive number');
        generateInput.value = '';
    } else if(maxValue){
        guessInput.focus();
        return maxValue;
    }
}

function playGame(event) {
    event.preventDefault();
    const userNum = Number(guessInput.value);
    const maxValue = Number(generateInput.value);
    const machineNum = Math.floor(Math.random() * (maxValue + 1));

    if(userNum === machineNum) {
        result.classList.add('wintext');
        result.innerText = 'You Win!!!';
        playingNum.innerText = `You chose: ${userNum}, the machine chose: ${machineNum}`;
        playBtn.disabled = true;

        setTimeout(function() {
            // if(!alert('You totally won! Wanna try one more?')){
            //   window.location.reload();}
          playBtn.disabled = false

        }, 2000);
    } else if( userNum < 0 ) {
        alert('Please write a positive number');
        guessInput.value = '';
    } else if ( userNum > maxValue ) {     
        alert(`Please write a number between 0 and ${maxValue}`);
        guessInput.value = '';
    } else {
        result.innerText = 'You Lost!!!';
        playingNum.innerText = `You chose: ${userNum}, the machine chose: ${machineNum}`;
    }
}

function alertEmpty() {
    if (generateInput.value === '') {
        alert(`hmm please make a range of number, first! `);
    }
}

generateForm.addEventListener('focusout', generateNum);
generateForm.addEventListener('submit', generateNum);
guessInput.addEventListener('click', alertEmpty);
guessForm.addEventListener('submit', playGame);

