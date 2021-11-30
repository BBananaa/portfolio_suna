let staticPath0 = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/static.mp4';
let cloudPath0 = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/cloud.mp4';
let humanPath0 = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/human.mp4';
let logoPath0 = './img/project/logo.jpg'
let centerPath0 = './img/project/center.jpg';
const videoBg0 = document.querySelector('.p5video');

let cloudVideo0, staticVideo0, humanVideo0, logoImg0, centerImg0;
let videos0;
let outsideVideos0;

let margin0 = 8;
let numOfScreensTall0 = 4;
let numOfScreensWide0 = 4;

let counter0 = 1;
let canvasH0 = videoBg0.clientHeight;
let canvasW0 = videoBg0.clientWidth;

function setup() {
  
  const canvas = createCanvas(canvasW0, canvasH0);
  canvas.parent(videoBg0)

  cloudVideo0 = createVideo(cloudPath0);
  staticVideo0 = createVideo(staticPath0);
  humanVideo0 = createVideo(humanPath0);
  centerImg0 = loadImage(centerPath0);
  logoImg0 = loadImage(logoPath0);

  videos0 = [staticVideo0, cloudVideo0, humanVideo0];

  for (let i = 0; i < videos0.length; i++) {
    let video0 = videos0[i]
    video0.volume(0);
    video0.loop();
    video0.hide();
  }
  
  outsideVideos0 = [staticVideo0, humanVideo0, cloudVideo0, humanVideo0, logoImg0];
}

function draw() {
  background(0);

  let w = (canvasW0 - margin0 * 3) / 4
  let h = (canvasH0 - margin0 * 3) /4

  for (let i = 0; i < numOfScreensWide0; i++) { 
    let x = i * (w + margin0);
    for (let j = 0; j < numOfScreensTall0; j++) {
    
      let y = j * (h + margin0);

      fill(255);
      
      // (0, 0)  (1, 0) (2, 0) (3, 0) 

      // (0, 1) /(1, 1) (2, 1) (3, 1)
      // (0, 2) /(1, 2) (2, 2) (3, 2)

      // (0, 3)  (1, 3) (2, 3) (3, 3) 

      if (i === 1 && j === 1) {
        image(centerImg0, x, y, w, h, 0, 0, centerImg0.width / 2, centerImg0.height / 2);
      } else if (i === 1 && j === 2) {
        image(centerImg0, x, y, w, h, 0, centerImg0.height / 2, centerImg0.width / 2, centerImg0.height / 2);
      }
      else if (i === 2 && j === 1) {
        image(centerImg0, x, y, w, h, centerImg0.width / 2, 0, centerImg0.width / 2, centerImg0.height / 2);
      } else if (i === 2 && j === 2) {
        image(centerImg0, x, y, w, h, centerImg0.width / 2, centerImg0.height / 2, centerImg0.width / 2, centerImg0.height / 2);
      }
      else { 
        // outside video
        let selectedIndex = (i + j * counter0) % outsideVideos0.length;
        let selectedVideo = outsideVideos0[selectedIndex];
        image(selectedVideo, x, y, w, h);
      }
    }
  }
}
function mouseClicked() {
  counter0++;
}
