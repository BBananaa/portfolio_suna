let staticPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/static.mp4';
let cloudPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/cloud.mp4';
let humanPath = 'https://static-assets.codecademy.com/Courses/Learn-p5/projects/human.mp4';
let logoPath = '../images/explore/logo.jpg'
let centerPath = '../images/explore/center.jpg';
const videoBg = document.querySelector('.video');

let cloudVideo, staticVideo, humanVideo, logoImg, centerImg;
let videos;
let outsideVideos;

let margin = 15;
let numOfScreensTall = 4;
let numOfScreensWide = 7;

let counter = 1;
let canvasH = videoBg.clientHeight;
let canvasW = videoBg.clientWidth;
function setup() {
  
  const canvas = createCanvas(canvasW, canvasH)
  canvas.parent(videoBg)

  // Load videos
  cloudVideo = createVideo(cloudPath);
  staticVideo = createVideo(staticPath);
  humanVideo = createVideo(humanPath);
  centerImg = loadImage(centerPath);
  logoImg = loadImage(logoPath);

  videos = [staticVideo, cloudVideo, humanVideo];
  for (let i = 0; i < videos.length; i++) {
    let video = videos[i]
    video.volume(0);
    video.loop();
    video.hide();
  }

  outsideVideos = [staticVideo, cloudVideo, humanVideo, staticVideo, humanVideo, logoImg];

}

function draw() {
  background(0);

  let w = (width - margin * (numOfScreensWide + 1)) / numOfScreensWide;
  let h = (height - margin * (numOfScreensTall + 1)) / numOfScreensTall;
  
  for (let i = 0; i < numOfScreensWide; i++) { 
    for (let j = 0; j < numOfScreensTall; j++) {
    
      let x = margin + i * (w + margin);
      let y = margin + j * (h + margin);
      
      fill(255);
      //rect(x, y, w, h);
      
      // (0, 0) (1, 0)  (2, 0) (3, 0)  (4, 0) (5, 0) (6, 0)

      // (0, 1) (1, 1) /(2, 1) (3, 1)/ (4, 1) (5, 1) (6, 1)
      // (0, 2) (1, 2) /(2, 2) (3, 2)/ (4, 2) (5, 2) (6, 2)

      // (0, 3) (1, 3)  (2, 3) (3, 3)  (4, 3) (5, 3) (6, 3)

      if (i === 2 && j === 1) {
        image(centerImg, x, y, w, h, 0, 0, centerImg.width / 3, centerImg.height / 2);
      } else if (i === 2 && j === 2) {
        image(centerImg, x, y, w, h, 0, centerImg.height / 2, centerImg.width / 3, centerImg.height / 2);
      }
      else if (i === 3 && j === 1) {
        image(centerImg, x, y, w, h, centerImg.width / 3, 0, centerImg.width / 3, centerImg.height / 2);
      } else if (i === 3 && j === 2) {
        image(centerImg, x, y, w, h, centerImg.width / 3, centerImg.height / 2, centerImg.width / 3, centerImg.height / 2);
      }

      else if (i === 4 && j === 1) {
        image(centerImg, x, y, w, h, centerImg.width * 2 / 3, 0, centerImg.width / 3, centerImg.height / 2);
      } else if (i === 4 && j === 2) {
        image(centerImg, x, y, w, h, centerImg.width * 2 / 3, centerImg.height / 2, centerImg.width / 3, centerImg.height / 2);
      }

      // else if ((i === 0 && j === 0) || (i === 4 && j === 0) || (i === 0 && j === 3) || (i === 4 && j === 3)) {
      //   image(outsideVideos[0], x, y, w, h);
      // } else if ((i === 1 && j === 0) || (i === 4 && j === 1) || (i === 0 && j === 2) || (i === 3 && j === 3)) {
      //   image(outsideVideos[1], x, y, w, h);
      // } else if ((i === 2 && j === 0) || (i === 0 && j === 1) || (i === 4 && j === 2) || (i === 2 && j === 3)) {
      //   image(outsideVideos[2], x, y, w, h);
      // } else {
      //   image(outsideVideos[3], x, y, w, h);
      // }

      else {
        // outside video
        let selectedIndex = (i + j * counter) % outsideVideos.length;
        let selectedVideo = outsideVideos[selectedIndex];
        image(selectedVideo, x, y, w, h);
      }
    }
  }
}

// Make videos on the outside change when mouse is clicked
function mouseClicked() {
  counter++;
}