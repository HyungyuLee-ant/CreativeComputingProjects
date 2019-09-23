let brightness = 0;
let fRate =10;
let size = 10;

var button;
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(fRate);
  background(brightness);
  button1 = createButton('brighter');
  button1.position(19, 9);
  button1.mousePressed(brighter);
  button2 = createButton('darker');
  button2.position(94, 9);
  button2.mousePressed(darker);
  button3 = createButton('save');
  button3.position(160, 9);
  button3.mousePressed(saveImg);
  button4 = createButton('faster');
  button4.position(19, 40);
  button4.mousePressed(faster);
  button5 = createButton('slower');
  button5.position(79, 40);
  button5.mousePressed(slower);
  button6 = createButton('bigger');
  button6.position(19, 70);
  button6.mousePressed(bigger);
  button7 = createButton('smaller');
  button7.position(80, 70);
  button7.mousePressed(smaller);
}

function brighter() {
  brightness += 10;
  background(brightness);
}

function darker() {
  brightness -= 10;
  background(brightness);
}

function faster() {
  fRate += 10;
  frameRate(fRate);
}

function slower() {
  fRate -= 10;
  frameRate(fRate);
}

function saveImg(){
  save('mycanvas.png');
}

function bigger(){
  size += 10;
}

function smaller(){
  size -= 10;
}

function draw() {
  r = random(255);
  g = random(255);
  b = random(255); 
  
if (mouseIsPressed) {        
        noStroke();
        fill(r,g,b);
        ellipse(mouseX, mouseY, size, size);
    }

function setup() {
    createCanvas(windowWidth,  windowHeight);
    frameRate(6);
}

fill(255)
rect(0,0,windowWidth,100);  
fill(0)
text('Warning: Changing background color will reset the drawing!\nSo save beforehand to protect your drawing.\nCurrent Framerate: ' + str(fRate)+ '\nCurrent Background Value: ' + str(brightness) + '\n(value less than 0 or exceeding 255 does not work\nSize:' + str(size),220,15);

}
