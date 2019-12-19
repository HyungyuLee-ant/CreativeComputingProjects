var video1, vide02, video3, video4, video5, video6;
// var video1p, vide02p, video3p, video4p, video5p, video6p; these became obsolete due to limited resources
var videoArray = [];

var bg;
var help;
var track;
var mainX = 89;
var mainY = 50;
var mainW = 1742;
var mainH = 980;
var sizeW = 224;
var sizeH = 126;
var yArray = 904;
var mode = 'play';
var drawings = [];
var newLayer = [];
var switching = [
  [0, 0]
];
var cPick;
var rSize = 20;

function preload() {

  //videos are cut for 150 seconds since github does not allow files larger than 150 MB.
  video1 = createVideo('Videos/high/1.mp4');
  video2 = createVideo('Videos/high/2.mp4');
  video3 = createVideo('Videos/high/3.mp4');
  video4 = createVideo('Videos/high/4.mp4');
  video5 = createVideo('Videos/high/5.mp4');
  video6 = createVideo('Videos/high/6.mp4');

  // really wanted to do thumbnail function, too, but was too heavy :(

  // video1p = createVideo('Videos/low/1.mp4');
  // video2p = createVideo('Videos/low/2.mp4');
  // video3p = createVideo('Videos/low/3.mp4');
  // video4p = createVideo('Videos/low/4.mp4');
  // video5p = createVideo('Videos/low/5.mp4');
  // video6p = createVideo('Videos/low/6.mp4');

  //would have make another array, or place them in location given on one-by-one procedure.

  helpImg = loadImage('Asset/help.png');
}

function setup() {
  createCanvas(1920, 1080);
  videoArray = [video1, video2, video3, video4, video5, video6];

  for (i = 0; i < videoArray.length; i++) {
    videoArray[i].size(mainW, mainH);
    videoArray[i].position(mainX, mainY);
    videoArray[i].hide();
    videoArray[i].volume(0);
  }
  videoArray[0].volume(1);

  // thumbnailArray = [video1p, video2p, video3p, video4p, video5p, video6p];
  // var xArray = [50, 312, 575, 837, 1100, 1362];
  // for (i = 0; i < thumbnailArray.length; i++) {
  //   thumbnailArray[i].size(sizeW, sizeH);
  //   thumbnailArray[i].position(xArray[i], yArray);
  //   thumbnailArray[i].volume(0);
  // 

  cPicker = createColorPicker();
  cPicker.position(10, 50);
  cPicker.hide();

  background(0);
  frameRate(29.97);
  a = createGraphics(1920, 1080);
  append(newLayer, a);
  track = 0;
}

function draw() {
  helpviewed = false;
  background(0);
  if (mode == 'play') {
    background(0);
    fill(0);
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);

    //mediarecord API was too heavy
    // text('RECORD', 150, 25);

    text('HELP', 400, 25);
    fill(255, 0, 0);
    image(helpImg, mainX, mainY);
    image(videoArray[track], 89, 50, 1742, 980);

  } else if (mode == 'draw') {

    cPicker.show();
    drawOn();
    image(videoArray[track], mainX, mainY, mainW, mainH);
    image(newLayer[newLayer.length - 1], 0, 0);

  } else if (mode == 'showCase') {
    //get current time of the video
    ax = float(videoArray[0].time().toFixed(1));

    //switch videos according to record
    for (k = 0; k < switching.length; k++) {
      if (ax == switching[k][0].toFixed(1)) {
        console.log(k);
        track = switching[k][1];
      }
    }
    image(videoArray[track], mainX, mainY, mainW, mainH);

    //show drawn pictures on their assigned time for a second.

    for (l = 0; l < newLayer.length - 1; l++) {
      if (1 > (ax - drawings[l].toFixed(1)) && (ax - drawings[l].toFixed(1)) > 0) {
        image(newLayer[l + 1], 0, 0);
      }
    }

  }
  strokeWeight(2);
  stroke(255);
  fill(0);
  ellipse(map(videoArray[0].time(), 0, videoArray[0].duration(), mainX, 1920 - mainX), 1040, 20, 20);
  noStroke();

  //show help only once, over everything
  if (mouseX > 300 && mouseX < 500 && mouseY > 0 && mouseY < 50 && helpviewed == false) {
    helpviewed = true;
    image(helpImg, 300, 50);
  }

}

function keyPressed() {
  if (true) {
    if (keyCode == 13) { //enter
      for (i = 0; i < videoArray.length; i++) {
        videoArray[i].play();
      }
      playing = true;
    } else if (keyCode == 49) { //num keys => track
      append(switching, [videoArray[0].time(), 0])
      track = 0;
    } else if (keyCode == 50) {
      append(switching, [videoArray[0].time(), 1])
      track = 1;
    } else if (keyCode == 51) {
      append(switching, [videoArray[0].time(), 2])
      track = 2;
    } else if (keyCode == 52) {
      append(switching, [videoArray[0].time(), 3])
      track = 3;
    } else if (keyCode == 53) {
      append(switching, [videoArray[0].time(), 4])
      track = 4;
    } else if (keyCode == 54) {
      append(switching, [videoArray[0].time(), 5])
      track = 5;
    } else if (keyCode == 32) { //space => play/pause
      playPause();
    } else if (keyCode == LEFT_ARROW) { //left arrow 
      a = videoArray[0].time()
      for (i = 0; i < videoArray.length; i++) {
        videoArray[i].time(a - 1);
      }
    } else if (keyCode == UP_ARROW) { //up arrow 
      rSize += 10
    } else if (keyCode == DOWN_ARROW) { //down arrow 
      if (rSize > 3) rSize -= 10
    } else if (keyCode == RIGHT_ARROW) { //right arrow 
      a = videoArray[0].time()
      for (i = 0; i < videoArray.length; i++) {
        videoArray[i].time(a + 1);
      }
    } else if (keyCode == 68) { //D
      playPause();
      a = createGraphics(1920, 1080)
      append(newLayer, a);
      mode = 'draw';
      frameRate(60);
    } else if (keyCode == 83) { //S
      append(drawings, videoArray[0].time());
      mode = 'play';
      frameRate(30);
      playnow();
      cPicker.hide();
    } else if (keyCode == 65) { //A
      append(drawings, videoArray[0].time());
      console.log(drawings.length);
      for (i = 0; i < switching.length; i++) {
        console.log(switching[i][0], switching[i][1])
      }
      mode = 'showCase';
      for (i = 0; i < videoArray.length; i++) {
        videoArray[i].stop();
      }
      for (i = 0; i < videoArray.length; i++) {
        videoArray[i].play();
      }
      console.log(newLayer.length, drawings.length);

    }
  }
}

function drawOn() {
  nl = newLayer[newLayer.length - 1];
  playing = true;
  playPause;

  //showing color & brush info - should not appear when playing.  
  textAlign(LEFT, CENTER);
  textSize(20);
  fill(0);
  rect(cPicker.width + cPicker.x, cPicker.y, 180, 30)
  fill(255);
  text('color', 10, cPicker.y - 5 - cPicker.height / 2)
  text('brush\nsize', 10, cPicker.y + cPicker.height + 35);
  text(str(rSize), 10, cPicker.y + cPicker.height + 80)

  //draw on new layer
  if (mouseIsPressed) {
    nl.fill(cPicker.value());
    nl.noStroke();
    nl.ellipse(mouseX, mouseY, rSize);
  }
}

function playnow() {
  for (i = 0; i < videoArray.length; i++) {
    videoArray[i].play();
  }
}

function playPause() {
  if (playing) {
    for (i = 0; i < videoArray.length; i++) {
      videoArray[i].pause();
    }
    playing = !playing
  } else {
    for (i = 0; i < videoArray.length; i++) {
      videoArray[i].play();
    }
    playing = !playing
  }
}