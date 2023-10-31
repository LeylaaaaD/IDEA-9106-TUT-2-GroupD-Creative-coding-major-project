let numDots = 700;
let smallerGrass = [];

function setup() {
  createCanvas(300, 600);
  background(242,169,4); 
  noLoop();
}

function drawgrass() {
   // draw the curve for the first huge grass
   noFill();
   strokeWeight(4);
 
  let ellipseCenterX = 190, ellipseCenterY = 80;
  let numCurves = 8; 
  let lineLength = 120; 
  let curveAmount = 40; 
 
  for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.2) {
      stroke(209, 79, 127);  
     } else {
       stroke(179, 70, 105);      
     }

     let angle = map(i, 0, numCurves, 0, -HALF_PI);  
     
     let x1 = ellipseCenterX;
     let y1 = ellipseCenterY;
     let x2 = x1 + curveAmount * sin(angle);
     let y2 = y1 + curveAmount * cos(angle);
     let x3 = x1 + (lineLength + curveAmount) * cos(angle);
     let y3 = y1 + (lineLength - curveAmount) * sin(angle);
     let x4 = x1 + lineLength * cos(angle);
     let y4 = y1 + lineLength * sin(angle);
 
     bezier(x1, y1, x2, y2, x3, y3, x4, y4);
  }
}

function drawFlippedGrass() {
  push();  
 
  translate(375, 10);
  scale(-1, 1);
  drawgrass(); 
  pop();  
}

function drawgrass1() {
  // draw the curve for the first huge grass
  noFill();
  strokeWeight(4);

  let ellipseCenterX = 140, ellipseCenterY = 320;
  let numCurves = 9; 
  let lineLength = 100; 
  let curveAmount = 50; 
  let steps = 8;
  let dotSize = 5;

  for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.5) {
      stroke(209, 79, 127);  
     } else {
       stroke(0);      
     }

    let angle = map(i, 0, numCurves, 0, -HALF_PI);  
     
    let x1 = ellipseCenterX;
    let y1 = ellipseCenterY;
    let x2 = x1 + (curveAmount * 0.5) * cos(angle);  
    let y2 = y1 + (lineLength * 0.5) * sin(angle);  
    let x3 = x1 + (lineLength * 0.75) * cos(angle); 
    let y3 = y1 + (curveAmount * 0.75) * sin(angle); 
    let x4 = x1 + lineLength  * cos(angle);
    let y4 = y1 + lineLength * sin(angle);
 
    bezier(x1, y1, x2, y2, x3, y3, x4, y4);  

  // add the red dots align the grass line
    fill(255, 0, 0);  
    noStroke();  
    for (let j = 0; j <= steps; j++) {
      let t = j / steps;
      let px = bezierPoint(x1, x2, x3, x4, t);
      let py = bezierPoint(y1, y2, y3, y4, t);

      let dotsAngle = atan2(py - y1, px - x1) + HALF_PI; 
      let offsetDistance = random(2, 4); 
      let offsetX = offsetDistance * cos(dotsAngle);
      let offsetY = offsetDistance * sin(dotsAngle);

      px += offsetX;
      py += offsetY;

      ellipse(px, py, dotSize, dotSize);
    }
  }
}

function drawFlippedGrass1() {
  push();  
 
  translate(300, -5);
  scale(-1, 1);
  drawgrass1(); 
  pop();  
}

function drawgrass2() {
  // draw the curve for the first huge grass
  noFill();
  strokeWeight(4);

    let ellipseCenterX = 115, ellipseCenterY = 460;
    let numCurves = 18; 
    let lineLength = 100; 
    let curveAmount = 40; 
 
   for (let i = 0; i < numCurves; i++) {
    if (random(1) > 0.3) {
      stroke(209, 79, 127);  
     } else {
       stroke(0);      
     }

     let angle = map(i, 2, numCurves, 0, PI);  
     
     let x1 = ellipseCenterX;
     let y1 = ellipseCenterY;
     let x2 = x1 + curveAmount * cos(angle);
     let y2 = y1 - curveAmount * sin(angle);
     let x3 = x1 + (lineLength + curveAmount) * cos(angle);
     let y3 = y1 + (lineLength - curveAmount) * sin(angle);
     let x4 = x1 + lineLength * cos(angle);
     let y4 = y1 + lineLength * sin(angle);
 
     bezier(x1, y1, x2, y2, x3, y3, x4, y4);
    }
}

class Small {
  constructor(x, y, color, angleMultiplier = 1, numCurves = 5, strokeW = 3, lineLength = 20, circleSize = 5) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.circleRadius = circleSize / 2;
    this.numCurves = numCurves;
    this.curveWidth = 2.5;
    this.strokeW = strokeW;
    this.lineLength = lineLength;
    this.angleMultiplier = angleMultiplier;
  }

  display() {
    fill(this.color);
    ellipse(this.x, this.y, this.circleRadius * 2);

    stroke(this.color);
    strokeWeight(this.strokeW);
    noFill();

    let rotationOffset = PI / 2;

    for (let i = 0; i < this.numCurves; i++) {
      let startAngle = this.angleMultiplier * PI / this.numCurves * i + rotationOffset; 
      let endAngle = startAngle + HALF_PI / this.numCurves;
      let curveRadius = this.circleRadius + this.lineLength; 
      let startX = this.x + this.circleRadius * cos(startAngle);
      let startY = this.y + this.circleRadius * sin(startAngle);

      beginShape();
      vertex(startX, startY);
      for (let a = startAngle; a < endAngle; a += 0.01) {
        let x = this.x + curveRadius * cos(a);
        let y = this.y + curveRadius * sin(a);
        let offset = map(sin(a * 4), -1, 1, -this.curveWidth, this.curveWidth);
        vertex(x + offset, y);
      }
      endShape();
    }
  }
}

function draw() {
  // draw the pink and black dots
  for (let i = 0; i < numDots; i++) {
    let x = random(width);
    let y = random(height);
    let size = random(6, 9);
    
    if (random(1) > 0.5) {
     fill(206, 72, 121);  
    } else {
      fill(0);      
    }
    noStroke();
    ellipse(x, y, size);
  }

  drawLeaveCurve()
  drawgrass();
  drawgrass1();
  drawFlippedGrass();
  drawFlippedGrass1();
  drawgrass2();

  stroke(79, 21, 27);
  line(190, 80, 220, 220);

  // draw the first roots of the huge grass
  noStroke();
  fill(183, 90, 125);  
  ellipse(190, 90, 40, 30);  

  //draw the second roots of the huge grass
  fill(196, 85, 135);  
  ellipse(150, 320, 40, 35);

  fill(105, 46, 76);  
  ellipse(150, 320, 35, 30);
  
  fill(252, 105, 155); 
  ellipse(150, 320, 30, 25);  
  
  fill(82, 25, 50); 
  ellipse(150, 320, 25, 20);

  //draw the third roots of the huge grass
  fill(229, 82, 139);  
  ellipse(115, 455, 45, 30);  

  smallerGrass.push(new Small(0, 0, color(0, 0, 0), -1, 12, 3, 80, 5));
  smallerGrass.push(new Small(0, 180, color(0, 0, 0), -1, 7, 3, 25, 5));
  smallerGrass.push(new Small(5, 230, color(0, 0, 0), -1, 8, 3, 40, 10));
  smallerGrass.push(new Small(5, 400, color(0, 0, 0), -1, 8, 3, 40, 10));
  smallerGrass.push(new Small(10, 400, color(209, 79, 127), -1, 7, 3, 40, 10));
  smallerGrass.push(new Small(10, 230, color(209, 79, 127), -1, 7, 3, 40, 10));
  smallerGrass.push(new Small(95, 200, color(0, 0, 0), 2, 8, 3, 25, 5));
  smallerGrass.push(new Small(90, 205, color(255, 0, 0), 2, 8, 3, 25, 5));
  smallerGrass.push(new Small(192, 153, color(255, 0, 0)));
  smallerGrass.push(new Small(205, 150, color(255, 0, 0)));
  smallerGrass.push(new Small(192, 153, color(255, 0, 0)));
  smallerGrass.push(new Small(230, 220, color(220, 79, 180), 2, 7));
  smallerGrass.push(new Small(225, 220, color(0, 0, 0), 2, 7));
  smallerGrass.push(new Small(270, 180, color(0, 0, 0), 1, 6));
  //red, pink black progression
  smallerGrass.push(new Small(290, 240, color(0, 0, 0)));
  smallerGrass.push(new Small(295, 240, color(209, 79, 127)));
  smallerGrass.push(new Small(300, 240, color(255, 0, 0)));
  //red, pink, black progression
  smallerGrass.push(new Small(290, 290, color(0, 0, 0)));
  smallerGrass.push(new Small(295, 290, color(209, 79, 127)));
  smallerGrass.push(new Small(300, 290, color(255, 0, 0)));
   //red, pink progression
  smallerGrass.push(new Small(295, 340, color(209, 79, 127)));
  smallerGrass.push(new Small(300, 340, color(255, 0, 0)));
  smallerGrass.push(new Small(300, 440, color(0, 0, 0), 1, 6));
  smallerGrass.push(new Small(290, 440, color(0, 0, 0), 1, 6));
  smallerGrass.push(new Small(300, 500, color(0, 0, 0), 1, 5));
  smallerGrass.push(new Small(300, 540, color(0, 0, 0), 1, 5));
  smallerGrass.push(new Small(270, 580, color(0, 0, 0), 1, 5));
  smallerGrass.push(new Small(205, 600, color(255, 0, 0), 2, 14, 3, 25, 5));
  smallerGrass.push(new Small(80, 350, color(255, 0, 0), -1.5, 10, 3, 20, 10));
  smallerGrass.push(new Small(120, 400, color(220, 79, 180), 2, 16, 3, 30, 20));
  smallerGrass.push(new Small(260, 430, color(107, 33, 33), 1, 8))
  smallerGrass.push(new Small(220, 490, color(0, 0, 0), -1, 6));

  for (let grass of smallerGrass) {
    grass.display();
  }
}

function drawLeaveCurve(){
  noFill();
  stroke(0);
  strokeWeight(5)
  beginShape();
  curveVertex(0,140);
  curveVertex(0,140);
  curveVertex(80,140);
  curveVertex(150,155);
  curveVertex(150,155);
  endShape();
  
  for (let i = 0; i < 7; i++) {
    noFill();
    stroke(0);
    beginShape();
    curveVertex(30 + i * 19, 150 + i);
    curveVertex(30 + i * 19, 150 + i * 2);
    curveVertex(45 + i * 18, 120 + i * 4);
    curveVertex(75 + i * 19, 100 + i * 6);
    curveVertex(75 + i * 19, 100 + i * 7);
    endShape();
  }

  for (let i = 0; i < 7; i++) {
    noFill();
    stroke(0);
    beginShape();
    curveVertex(20 + i * 19, 138 + i);
    curveVertex(20 + i * 19, 138 + i * 2);
    curveVertex(35 + i * 18, 145 + i * 5);
    curveVertex(50 + i * 19, 155 + i * 6);
    curveVertex(60 + i * 19, 160 + i * 7);
    endShape();
  }
  for (let i = 0; i < 5; i++) {
    noFill()
    stroke(209, 79, 127);
    beginShape();
    curveVertex(35 + i * 27, 140 + i);
    curveVertex(35 + i * 27, 140 + i * 2);
    curveVertex(65 + i * 20, 120 + i * 5);
    curveVertex(80+ i * 19, 110 + i * 6);
    curveVertex(80 + i * 19, 110 + i * 6);
    endShape();
  }
  for (let i = 0; i < 5; i++) {
    noFill()
    stroke(209, 79, 127);
    beginShape();
    curveVertex(25 + i * 28, 140 + i);
    curveVertex(25 + i * 28, 140 + i * 2);
    curveVertex(35 + i * 28, 150 + i * 5);
    curveVertex(80+ i * 19, 165 + i * 4);
    curveVertex(80 + i * 19, 165 + i * 5);
    endShape();
  }
}