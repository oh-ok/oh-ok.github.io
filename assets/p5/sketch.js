let t = "kieran geary";
//let points, bounds;
let font, img1, img2, img3, img4, img5;


function onError(err) {
  print(err);
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

  avoid_mouse(amount, factor) {
    let distance;
    distance = dist((mouseX-(width/2)),(mouseY-(height/2)), this.x, this.y);
    this.x-=((mouseX-(width/2))-this.x)/distance*factor;
    this.y-=((mouseY-(height/2))-this.y)/distance*factor;
  }
}

const orbs = [];

function generateOrbs(image) {
  pg = createGraphics(width,height,WEBGL);

  if (orbs.length!=0) return true;
  pg.textFont(font);
  pg.textAlign(CENTER);
  pg.textSize(80);
  pg.fill(0);
  pg.text("portfolio",0,0);
  pg.imageMode(CENTER);
  if (!(firefoxAgent = navigator.userAgent.indexOf("Firefox") > -1)) {
    pg.image(image,-0.5,pg.textSize()*0.8,width/3,height/6);
  }


  let i=0;
  for (let x = 0; x < width; x+=2) {
    for (let y = 0; y < height; y+=2) {
      pix=pg.get(int(x),int(y));
      let c = color(pix[0],pix[1],pix[2], pix[3]);
      if (pix[3]>0) {
        orbs[i]=new Orb(x-(width/2),-y+(height/2),c,3); 
        i++;
      }
    }
  }
  return false;
}

function setup() {
  createCanvas(windowWidth,windowHeight, WEBGL);
  background(0,255,0);
  font = loadFont('PTSerif-Bold.ttf', checkLoaded);
  img1 = loadImage('img/img1.svg', checkLoaded);
  img2 = loadImage('img/img2.jpg', checkLoaded);
  img3 = loadImage('img/img3.jpg', checkLoaded);
  img4 = loadImage('img/img4.jpg', checkLoaded);
  img5 = loadImage('img/img5.jpg', checkLoaded);
}

let numToLoad=6;
function checkLoaded() {
  numToLoad-=1;
  //print(numToLoad);
}

function draw() {
  //UNLOADED DRAWING
  background(15,38,30);
  noStroke();
  fill(255,82, 119);
  rect(0,0, 10);
  rect(-20,0, 10);
  rect(20,0, 10);

  if (numToLoad>0) return; //Check if loaded fully
  else {
  //LOADED IMAGE
  
  if (orbs.length==0) generateOrbs(img1);
  
  background(255,82, 119);

  imageMode(CENTER);
  if (mouseX==50 && mouseY==50) true;
  else if (mouseX<1*width/3 && mouseY<height/4) image(img2, 0,0,(height/960)*1920,height);
  else if (mouseX<3*width/3 && mouseY<height/4) image(img3, 0,0,(height/960)*1920,height);
  else if (mouseX<1*width/3 && mouseY>3*height/4) image(img4, 0,0,(height/960)*1920,height);
  else if (mouseX<3*width/3 && mouseY>3*height/4) image(img5, 0,0,(height/960)*1920,height);
  
  if (numToLoad<0) {
    strokeWeight(0);
    textSize(20);
    textAlign(LEFT);
    fill(0);
    textFont(font);
    text(int(frameRate()),20-(width/2),20-(height/2));  
  }
  for (let i = 0; i < orbs.length; i++) {
    orbs[i].avoid_mouse(width/2, 1);
    orbs[i].converge(80);
    orbs[i].display();
  }

  }
}

function mouseClicked() {
  open('/portfolio/');
}