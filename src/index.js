const gallContainer = document.querySelector('.gallery-container')

const bigConatiner = document.querySelector('.big-container')
const imgWrap = document.querySelector('.img-wrap')
const closeBtn = document.querySelector('.closeBtn')
let artImgs;


  const loader = document.querySelector('.loader')
  const percent = document.querySelector('.percent')
  const making = document.querySelector('.making')
  const loadText = document.querySelector('.load-text')
  let t = 1

  loadText.style.transform = "translateX(-2000px)"

  const per = setInterval( () => {
    percent.textContent = String(t++).padStart(2, "0")
    if (t === 101) clearInterval(per)
  }, 20) 

  setTimeout( () => {
    making.textContent = "LOADING"
  }, 1500)

  setTimeout( () => {
    loader.parentElement.removeChild(loader)
  }, 3500)



async function getPhotos() {
  let response = await fetch("./src/photos.json")
  let photos = await response.json()
  return photos
}

function getPhotosHtml(photos) {
  let photosHtml = photos.map(photo => {
      return `<div class="item">
                <div class="artwork">
                  <img class="artImg-s" src="${photo.src}" alt=""/>
                </div>
                <p class="title">${photo.title}</p>
              </div>`
  }).join('')
  return photosHtml
}

let gField;
let items;

getPhotos().then(photos => {    
  gallContainer.innerHTML = `${getPhotosHtml(photos)}`    
  gField = gallContainer.getBoundingClientRect().width
  items = Array.from(document.getElementsByClassName("item"))
  artImgs = Array.from(document.getElementsByClassName("artImg-s"))
  
}).then(() => {
  console.log(artImgs[41].naturalWidth, artImgs[41].naturalHeight)

  for (let i = 0; i < items.length; i++) {
    if(artImgs[i].naturalWidth * 1.3 < artImgs[i].naturalHeight) {
      items[i].style.width = `${randomNumber(6, 10)}rem`
      items[i].style.top = `${randomNumber(12, 20)}%`
    } else if(artImgs[i].naturalWidth > artImgs[i].naturalHeight * 1.6) {
      items[i].style.width = `${randomNumber(10, 15)}rem`
      items[i].style.top = `${randomNumber(15, 70)}%`
    } else {
      items[i].style.width = `${randomNumber(9, 13)}rem`
      items[i].style.top = `${randomNumber(14, 55)}%`
    }
    items[i].style.left = `${randomNumber(gField / 2, gField * 6)}px`
    items[i].style.zIndex = `${Math.floor(randomNumber(10, 80))}`
    items[i].childNodes[1].style.padding = `${randomNumber(3, 12)}px`

    let startx;
    let x;
    let xx;
    let pressed = false;
    let wheel;
    let xPos = 0;
    let add = -1
    let boundaryL;
    let boundaryR;
    const gallery = document.querySelector('#gallery')
    const headerGallery = document.querySelector('.gallery')

    headerGallery.addEventListener("click", () => {
      clearInterval(moving)
      return moving = setInterval(move, randomNumber(2, 12));
    })

    let moving = setInterval(move, randomNumber(2, 12));

    function move() {
      boundaryL = items.every(item => {
        return item.getBoundingClientRect().x > gField /5
      })
      boundaryR = items.every(item => {
        return item.getBoundingClientRect().x < gField /1.3
      })

      xPos = xPos + add;
      if (boundaryL) {
        add = -1
      } else if (boundaryR) {
        add = 1      
      }
      items[i].style.transform = `translateX(${xPos}px)`;

      if(gallery.style.display === "none") {
        clearInterval(moving)
      }
    }
    
    gallContainer.addEventListener('mouseup', () => {
        gallContainer.style.cursor = 'ew-resize'
    })
    gallContainer.addEventListener('mouseenter', () => {
        gallContainer.style.cursor = 'ew-resize'
    })
    window.addEventListener('mouseup', () => {
        pressed = false;
    })  
    
    gallContainer.addEventListener('mousedown', (e) => {
      
      pressed = true;
      startx = e.offsetX
      gallContainer.style.cursor = 'grabbing'
      for (let img of artImgs) {
          if(e.target === img)
          return !pressed;
      }
    });
    
    window.addEventListener('wheel', (e) => {
      if(i % 4 === 0) wheel = e.deltaY 
      else if (i % 3 === 0) wheel = e.deltaY / 2
      else wheel = e.deltaY / 3

      if(wheel < 0) {
        add = -1
        if (boundaryR) return wheel = 0
      } else {
        add = 1
        if (boundaryL) return wheel = 0
      }
      xPos = xPos + wheel;
    })
  
    gallContainer.addEventListener('mousemove', (e) => {
      e.preventDefault()
      if(!pressed) return
      for (let img of artImgs) {
        if(e.target === img)
        return pressed = false;
      }
      gallContainer.style.cursor = 'grabbing'
      x = e.offsetX
      xx = x - startx

      checkBoundary()
      if(i % 4 === 0) xPos = xPos + (xx / 45);
      else if(i % 3 === 0) xPos = xPos + (xx / 35);
      else xPos = xPos + (xx / 30);
    })

    gallContainer.addEventListener('touchstart', (e) => { 
      for (let img of artImgs) {
        if(e.target === img)
        return startx = false
      }
      startx = e.touches[0].pageX
    }, false);
    
    gallContainer.addEventListener('touchmove', (e) => {
      for (let img of artImgs) {
        if(e.target === img)
        return xx = false;
      }
      x = e.changedTouches[0].pageX;;
      xx = x - startx
      checkBoundary()
      if(i % 2 === 0) xPos = xPos + (xx / 40);
      else if(i % 2 === 0) xPos = xPos + (xx / 30);
      else xPos = xPos + (xx / 20);

    }, false)
    function checkBoundary() {
      if (startx < x) {
          add = 1
        if (boundaryL) {
          xx = 0
          return pressed = false;
        }      
      } else if (startx > x) {
        add = -1
        if (boundaryR) {
          xx = 0
          return pressed = false;
        }
      }
    }
  }

  let selectedImg;
  let text;
  
  artImgs.forEach(artImg => {
    artImg.addEventListener("click", enlargeImg)

    function enlargeImg(e) {
      selectedImg = document.createElement("img")
      text = document.querySelector('.text')
      selectedImg.src = `${e.target.src}`

      bigConatiner.style.display = "block"
      imgWrap.appendChild(selectedImg)
      text.textContent = `${e.target.parentElement.nextElementSibling.textContent}`
    }
  })
  closeBtn.addEventListener('click', () => {
    imgWrap.innerHTML =""
    text.innerHTML = ""
    bigConatiner.style.display = 'none'
  })
})


function randomNumber(min, max) {
  let random = Math.floor(Math.random() * (max - min) + min);
  return random
}
