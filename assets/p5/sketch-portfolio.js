let drawFPS=false;
let font, img1, img2, img3, img4, img5;
// I don't think I'm ever using this, but its here anyway
function onError(err) {
  print(err);
}
// Checks how many things are loaded
let numToLoad=1;
function checkLoaded() {
  numToLoad-=1;
}


let drawX
function setup() {
  frameRate(120);
  mouseX, mouseY = width/2;
  drawX=width/4;
  createCanvas(windowWidth,windowHeight, WEBGL);
  increment=Math.ceil(width/400);
  font = loadFont('PTSerif-Bold.ttf', checkLoaded);

}


class Orb {
  constructor(xpos,ypos, col, width) {
    this.oxpos = xpos;
    this.oypos = ypos;
    this.x = xpos;
    this.y = ypos;
    this.col = col;
    this.width = width;
  }
  display() {
    // stroke(this.col);
    // strokeWeight(this.width);
    // point(this.x, this.y);
    
    // USING 3D NOW (HOPING IT FORCES GPU COMPUTE [IT DOESN'T REALLY])
    translate(this.x,this.y);
    strokeWeight(0);
    fill(this.col);
    plane(this.width/2,this.width/2);
    translate(-this.x,-this.y);
  };
  converge(amount) {
    this.x-=2*(this.x-this.oxpos)/amount;
    this.y-=2*(this.y-this.oypos)/amount;
  }
  avoid_mouse(factor) {
    let distanceSq;
    distanceSq = distSq((mouseX-(width/2)),(mouseY-(height/2)), this.x, this.y);
    let dista=sqroot(distanceSq);
    this.x-=(mToZero("x")-this.x)/(dista*factor);
    this.y-=(mToZero("y")-this.y)/(dista*factor);
  }
}

function mToZero(type) {
  switch (type) {
    case "x": // Then x & width
      return mouseX-(width/2);
    case "y":
      return mouseY-(height/2);
    default:
      return console.log("ERROR, mToZero passed ", type);
  }
}

function distSq(x1, y1, x2, y2) {
  //a,sq + b,sq = c,sq
  return sq(x1 - x2) + sq(y1 - y2);
}

function sqroot(number) {
  var lo = 0, hi = number;
  while(lo <= hi) {
       var mid = Math.floor((lo + hi) / 2);
       if(mid * mid > number) hi = mid - 1;
       else lo = mid + 1;
  }
  return hi;
}

let pg;
let pgDrawn = false;
let frame;
function drawToGraphics(image) {
  pgDrawn=true;
  pg = createGraphics(width,height,WEBGL);
  if (orbs.length!=0) return true;
  pg.textFont(font);
  pg.textAlign(CENTER);
  pg.textSize(width/10);
  pg.fill(255);
  pg.text("kieran geary",0,-textSize()*0.5);
  // pg.imageMode(CENTER);
  // if (!(firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1)) {
  //   pg.image(image,-0.5,pg.textSize()*0.8,textSize()*33,textSize()*11);
  // }
  pg.loadPixels();
  frame=pg.pixels;
}

let orbs = [];
function generateOrbs(x , y) {
    let c;
    let alph;
    let d = pixelDensity();
    for (let i = 0; i < d; i++) {
      for (let j = 0; j < d; j++) {
        index = 4 * ((y * d + j) * width * d + (x * d + i));
        c = color(frame[index],
        frame[index+1],
        frame[index+2],
        frame[index+3]
        );
        alph=frame[index+3];
      }
    }
    if (alph>0) {
      //print(x, y,c.toString());
      orbs[orbs.length]=new Orb(x-(width/2),-y+(height/2),c,increment); 
  }
  return false;
}


let cRotRate=0;
let lastFrameRate;
function draw() {
  //### UNLOADED DRAWING

  //Pink background with the three squares
  background(15,38,30);
  noStroke();
  fill(255,82, 119);
  rect(0,0, 10);
  rect(-20,0, 10);
  rect(20,0, 10);

  if (numToLoad>0) return; //Check if loaded fully
  else {

  //### LOADED DRAWING
  
  background(15,38,30);

  //if the offscreen thing hasn't been drawn to, then make it and draw to it
  if (!pgDrawn) drawToGraphics(img1);
  
  // Create the orbs by scanning across the screen
  if (drawX<width) {
    for (let y = 0; y < height; y+=increment) {
      generateOrbs(drawX, y);
    }
    drawX+=increment;
  }


  //Set the background to be the hero images when hovered in the corners
  // imageMode(CENTER);
  // if (mouseX==50 && mouseY==50) true;
  // else if (mouseX<1*width/3 && mouseY<height/4) image(img2, 0,0,(height/960)*1920,height);
  // else if (mouseX<3*width/3 && mouseY<height/4) image(img3, 0,0,(height/960)*1920,height);
  // else if (mouseX<1*width/3 && mouseY>3*height/4) image(img4, 0,0,(height/960)*1920,height);
  // else if (mouseX<3*width/3 && mouseY>3*height/4) image(img5, 0,0,(height/960)*1920,height);
  

  // Draw the FPS counter
  if (numToLoad<1 && drawFPS) {
    strokeWeight(0);
    textSize(20);
    textAlign(LEFT);
    fill(0);
    textFont(font);
    if (frameCount % 4 == 0) { 
      lastFrameRate=frameRate();
      text(int(frameRate()),20-(width/2),20-(height/2));
    } else {
      text(int(lastFrameRate),20-(width/2),20-(height/2));
    }
  }

  //Draw the orbs
  for (let i = 0; i < orbs.length; i++) {
    orbs[i].avoid_mouse(0.8);
    orbs[i].converge(80);
    orbs[i].display();
  }

  //### MOUSE STYLING
  // const margin=0.95;
  // if (mouseX>(width*margin) || mouseX<width-(width*margin) || mouseY>height*margin || mouseY<height-(height*margin)) return;

  // push();
  // cRotRate=-(millis()/2000)*PI;
  // cursor(CROSS, 16, 16);
  // translate(mouseX-(width/2), mouseY-(height/2));
  // rotate(cRotRate);
  // blendMode(EXCLUSION);
  // image(cursorImg, 0, 0, 75, 75);
  // blendMode(BLEND);
  // pop();
  }
}


//Open the portfolio page when clicked on
// function mouseClicked() {
//   open('/portfolio/');
// }

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}