const header = document.querySelector('header')
const work02 = document.querySelector('.work02')
const pacman = document.querySelector('#pacman')
const grid = document.querySelector('.board')
const playButton = document.querySelector('.pacman-play')

const playGround = document.querySelector('.playGround')
const startButton = document.querySelector('.pacman-start')
const scoreDisplay = document.getElementById('score')
const closeButton = document.querySelector('#close-game')

const addGrid = document.querySelector('.add-grid')
// const pacImg = document.createElement('img');
//     pacImg.setAttribute('src', 'img/project/pacman.png');
const pacImg = document.createElement('p')
pacImg.innerHTML = '<span class="iconify" data-icon="icomoon-free:pacman"></span>'

const width = 28
let squares = []
let score = 0

// 0 - pacdots
// 1 - wall
// 2 - ghost lair
// 3 - powerpellets
// 4 - empty

const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
]

class Ghost {
  constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.isScared = false
      this.timerId = NaN
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]
let ghostImg
//draw my ghosts onto my grid
function drawGhosts() { 
  ghosts.forEach(ghost => {
    ghostImg = document.createElement('div')
    ghostImg.innerHTML = `<span class="iconify" data-icon="bx:bxs-ghost"></span>`

  squares[ghost.currentIndex].classList.add(ghost.className)
  squares[ghost.currentIndex].classList.add('ghost')
  squares[ghost.currentIndex].append(ghostImg)
})}

let pacmanCurrentIndex = 490
//create board
function createBoard(board) {
  //for loop 
  for (let i = 0; i < layout.length; i++) {
    //create a square 
    const square = document.createElement('div')
    //put square in grid 
    board.appendChild(square)
    //put square in squares array
    squares.push(square)
    
    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot')
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall')
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair')
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet')
    }
    
  }
    squares[pacmanCurrentIndex].classList.add('pacman')
    squares[pacmanCurrentIndex].appendChild(pacImg)
    drawGhosts();
}
createBoard(grid)

// down - 40
// up key - 38
// left - 37
// right - 39

//starting position of pacman 

function control(e) {
    squares[pacmanCurrentIndex].classList.remove('pacman')
    switch(e.keyCode) {
        case 40:
        if (
            !squares[pacmanCurrentIndex + width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex + width].classList.contains('wall') &&
            pacmanCurrentIndex + width < width * width
            ) 
            pacmanCurrentIndex += width
            pacImg.style.transform = `rotate(90deg)`
        break
        case 38:
        if (
            !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex - width].classList.contains('wall') &&
            pacmanCurrentIndex - width >=0
            ) 
            pacmanCurrentIndex -= width
            pacImg.style.transform = `rotate(-90deg)`
        break
        case 37: 
        if( 
            !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex -1].classList.contains('wall') &&
            pacmanCurrentIndex % width !==0
            ) 
            pacmanCurrentIndex -=1
            pacImg.style.transform = `rotateY(-180deg)`
            if (pacmanCurrentIndex === 364) {
                pacmanCurrentIndex = 391
            }
        break
        case 39:
        if(
            !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair') &&
            !squares[pacmanCurrentIndex +1].classList.contains('wall') &&
            pacmanCurrentIndex % width < width -1
            ) 
            pacmanCurrentIndex +=1
            pacImg.style.transform = `rotate(0deg)`
            if (pacmanCurrentIndex === 391) {
                pacmanCurrentIndex = 364
            }
        break
    }
    squares[pacmanCurrentIndex].classList.add('pacman')
    squares[pacmanCurrentIndex].appendChild(pacImg)
    pacDotEaten()
    powerPelletEaten()
    checkForWin()
    checkForGameOver()
}

function pacDotEaten() {
    if (squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
        squares[pacmanCurrentIndex].classList.remove('pac-dot')
        score++
        scoreDisplay.innerHTML = score
    }
}

function powerPelletEaten() {
    //if square pacman is in contains a power pellet
    if (squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
        //remove power pellet class
        squares[pacmanCurrentIndex].classList.remove('power-pellet')
        //add a score of 10
        score +=10
        scoreDisplay.innerHTML = score
        //change each of the four ghosts to isScared
        ghosts.forEach(ghost => ghost.isScared = true)
        //use setTimeout to unscare ghosts after seconds   
        setTimeout(unScareGhosts, 10000)    
    }
}

function unScareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
}

//move the ghosts

function moveGhost(ghost) {
    const directions = [-1, +1, -width, +width]
    let direction = directions[Math.floor(Math.random() * directions.length)]
    
    ghost.timerId = setInterval(function() {
        //if the next square does NOT contain a wall and does not contain a ghost
        if (
            !squares[ghost.currentIndex + direction].classList.contains('wall') &&
            !squares[ghost.currentIndex + direction].classList.contains('ghost')
        ) {
                //remove any ghost
        squares[ghost.currentIndex].classList.remove(ghost.className)
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost')
        squares[ghost.currentIndex].innerHTML = ""

        // //add direction to current Index
        ghost.currentIndex += direction
        ghostImg = document.createElement('div')
        ghostImg.innerHTML = `<span class="iconify" data-icon="bx:bxs-ghost"></span>`
        // //add ghost class
        squares[ghost.currentIndex].classList.add(ghost.className)  
        squares[ghost.currentIndex].classList.add('ghost')
        squares[ghost.currentIndex].append(ghostImg)

        } else direction = directions[Math.floor(Math.random() * directions.length)]

        //if the ghost is currently scared 
        if (ghost.isScared) {
            squares[ghost.currentIndex].classList.add('scared-ghost')
        }
        
        //if the ghost is current scared AND pacman is on it
        if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
            //remove classnames - ghost.className, 'ghost', 'scared-ghost'
            
            squares[ghost.currentIndex].innerHTML = ""
            squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
            // change ghosts currentIndex back to its startIndex
            ghost.currentIndex = ghost.startIndex
            //add a score of 100
            score +=100
            scoreDisplay.innerHTML = score

            //re-add classnames of ghost.className and 'ghost' to the ghosts new postion  
            ghostImg = document.createElement('div')
            ghostImg.innerHTML = `<span class="iconify" data-icon="bx:bxs-ghost"></span>`
            squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
            squares[ghost.currentIndex].append(ghostImg)

        }
        checkForGameOver()
    }, ghost.speed )
}

//check for game over
function checkForGameOver() {
    //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
    if (
        squares[pacmanCurrentIndex].classList.contains('ghost') && 
        !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
    ) {
     //for each ghost - we need to stop it moving
      ghosts.forEach(ghost => clearInterval(ghost.timerId))
      //remove eventlistener from control function
      document.removeEventListener('keyup', control)
      //tell user the game is over   
      scoreDisplay.innerHTML = 'You LOSE'
      startButton.textContent = "The End"
      squares[pacmanCurrentIndex].innerHTML = ""
      squares[pacmanCurrentIndex].classList.remove('pacman')
    
    setTimeout( reset, 4000)
    }
}

//check for win
function checkForWin() {
    if (score >= 300) {
        //stop each ghost
        ghosts.forEach(ghost => clearInterval(ghost.timerId))
        //remove the eventListener for the control function
        document.removeEventListener('keyup', control)
        //tell our user we have won
        scoreDisplay.innerHTML = 'You WIN!'
        startButton.textContent = "The End"
        setTimeout( reset, 4000)
    }
}

function reset() {
  ghosts.forEach(ghost => {
    ghost.currentIndex = ghost.startIndex
    clearInterval(ghost.timerId)
  })
  pacmanCurrentIndex = 490
  squares = [];
  addGrid.innerHTML = ""
  createBoard(addGrid) 
  score = 0
  scoreDisplay.innerHTML = ""
  startButton.classList.remove('started')
  startButton.textContent = "Start"

}

playButton.addEventListener('click', () => {
  playGround.style.display = "flex"
  project.style.display = "none"
  header.style.display = "none"
  reset()
})
startButton.addEventListener('click', () => {
  document.addEventListener('keyup', control)
  startButton.textContent = "Started"
  startButton.classList.add('started')
  ghosts.forEach(ghost => moveGhost(ghost))
})

closeButton.addEventListener('click', () => {
  playGround.style.display = "none"
  project.style.display = "block"
  header.style.display = "flex"
  reset()

})