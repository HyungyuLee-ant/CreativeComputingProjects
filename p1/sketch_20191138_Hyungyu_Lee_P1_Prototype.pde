void setup(){
  size(800,800);
  background(random(0,255));
  frameRate(60000);
}

void draw(){
  float size = random(10,70);
  float size_alt = map(size,10,70,0,255);
  float mouseX_alt = map(mouseX,0,800,0,255);
  float mouseY_alt = map(mouseY,0,800,0,255);
    if (mousePressed){
      noStroke();
      fill(mouseX_alt, mouseY_alt, size_alt, 127);
      ellipse(mouseX, mouseY, size, size);
      fill(127);
      rect(0,700,800,50);
      textSize(20);
      fill(255);
      textAlign(CENTER, 730);
      text("Red, Blue, Green (rounded) of the Circle created: "+ str(Math.round(mouseX_alt))+ ", "+  str(Math.round(mouseY_alt))+ ", "+ str(Math.round(size_alt)), 400, 732);

    }
    else{
      noStroke();
      fill(mouseX_alt, mouseY_alt, size_alt, 127);
      rect(mouseX, mouseY, size, size);
      fill(127);
      rect(0,700,800,50);
      textSize(20);
      fill(255);
      textAlign(CENTER, 730);
      text("Red, Blue, Green (rounded) of the Square created: "+ str(Math.round(mouseX_alt))+ ", "+  str(Math.round(mouseY_alt))+ ", "+ str(Math.round(size_alt)), 400, 732);

  }
  
  save("RGBpractice.jpg");
}
