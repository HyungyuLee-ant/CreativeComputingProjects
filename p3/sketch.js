let capture;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  frameRate(10);
  //capture.hide();
}

function draw() {

/// big grid - slash&backslash created randomly
  randomSeed(0);
  var x, y, z;
  var delta = 50;
  var backSlashProb = map(mouseX, 0, windowWidth, 0, 1);

  for (y=0; y<windowHeight; y+=delta) {
    for (x=0; x<windowWidth; x+=delta) {
      z = random(0, 1);
      if (z < backSlashProb) {
        stroke(random(255),0,0, 127);
        strokeWeight(25);
        line(x, y, x+delta, y+delta);
      } else {
        stroke(0,127);
        strokeWeight(5);
        line(x+delta, y, x, y+delta);
      }
    }
  } 
  
// making a square with interactive noise  
  noStroke();
  fill(255);
  rect(30,30,windowWidth/2,windowHeight/2);
  strokeWeight(1);
  let noiseScale = 0.02;  
  for (let x=0;  x < windowWidth/2; x++) {
    if (x >30){
      if(mouseY>30 &&mouseY<300){
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(0,noiseVal*255,0);
    line(x, mouseY+noiseVal*80, x, windowHeight/2);
  }}}
 
///small grids 
  for (let y = 80; y <= height - 80; y += 20) {
    for (let x = 80; x <= width - 80; x += 20) {
      stroke(0,0,255,127);
      strokeWeight(3)
      line(x - 6, y - 6, x + 6, y + 6);
      if (x < mouseX && y < mouseY) {
				line(x - 6, y + 6, x + 6, y - 6);
      }
    }
  }
  image(capture, windowWidth/2-160, windowHeight/2-120); 

}