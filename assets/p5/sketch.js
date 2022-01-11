let t = "kieran geary";
let points, bounds;
let font;
let img1;
function preload() {
  font = loadFont('PTSerif-Bold.ttf');
  img1 = loadImage('img/img1.svg');
  img2 = loadImage('img/img2.png');
  img3 = loadImage('img/img3.png');
  img4 = loadImage('img/img4.png');
  img5 = loadImage('img/img5.png');
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
    //fill(this.col);
    stroke(this.col);
    strokeWeight(this.width);
    point(this.x, this.y);
  };

  jitter(amount) {
    this.x+=random(-amount,amount);
    this.y+=random(-amount,amount);
  }

  converge(amount) {
    this.x-=2*(this.x-this.oxpos)/amount;
    this.y-=2*(this.y-this.oypos)/amount;
  }

  avoid_mouse(amount, factor) {
    let distance;
    distance = dist(mouseX,mouseY, this.x, this.y);
    //if (distance<amount) {
      this.x-=(mouseX-this.x)/distance*factor;
      this.y-=(mouseY-this.y)/distance*factor;
    //}
  }
}

const orbs = [];
let pCanvas;
let firstdraw=true;

function setup() {
  createCanvas(windowWidth,windowHeight);
  mouseX=random(width/5,(4*width)/5);
  mouseY=random(height/5,(4*height)/5);
  colorMode(RGB);
  frameRate(30);
  pCanvas = createGraphics(width, height);
  draw();
  pCanvas.textAlign(CENTER);
  pCanvas.textFont(font);
  pCanvas.textSize(80);
  pCanvas.text("portfolio", width/2, height/2);
  if (!(firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1)) pCanvas.image(img1,width/3,2*height/4,width/3,height/6);
  let i=0;
  for (let x = 0; x < width; x+=2) {
    for (let y = 0; y < height; y+=2) {
      pix=pCanvas.get(x,y);
      let c = color(pix[0],pix[1],pix[2], pix[3]);
      if (pix[3]>0) {
        orbs[i]=new Orb(x,y,c,2);
        i++;
      }
    }
  }
print(mouseX);
print(mouseY);
}

function draw() {
  if (firstdraw) {
    firstdraw=false;
    return;
  }

  if (frameCount<30) background(lerpColor(color(15,38,30,0), color(255,82,119,255), frameCount/30));
  else background(255,82, 119);


  if (mouseX==50 && mouseY==50) frameRate();
  else if (mouseX<1*width/3 && mouseY<height/4) image(img2, (width-960)/3,0,(height/960)*1920,height);
  else if (mouseX<3*width/3 && mouseY<height/4) image(img3, (width-960)/3,0,(height/960)*1920,height);
  else if (mouseX<1*width/3 && mouseY>3*height/4) image(img4, (width-960)/3,0,(height/960)*1920,height);
  else if (mouseX<3*width/3 && mouseY>3*height/4) image(img5, (width-960)/3,0,(height/960)*1920,height);
  

  for (let i = 0; i < orbs.length; i++) {
    orbs[i].avoid_mouse(width/2, 1);
    orbs[i].converge(80);
    orbs[i].display();
  }
  //strokeWeight(0);
  //textSize(10);
  //textAlign(LEFT);
  //text(int(frameRate()),20,20);
}

function mouseClicked() {
  open('/portfolio/');
}